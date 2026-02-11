import { POST } from "./route";
import { NextRequest } from "next/server";

const mockSendEmail = jest.fn();

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: (...args: unknown[]) => mockSendEmail(...args),
      },
    })),
  };
});

describe("API Route /api/send", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSendEmail.mockResolvedValue({ id: "mock-id-123" });
  });
  it("should call resend with correct when it receive a POST call", async () => {
    const fakeRequestBody = {
      name: "Mario Rossi",
      email: "mario@test.com",
      message: "Ciao, vorrei un preventivo",
    };

    const req = new NextRequest("http://localhost:3000/api/send", {
      method: "POST",
      body: JSON.stringify(fakeRequestBody),
    });

    await POST(req);

    expect(mockSendEmail).toHaveBeenCalledTimes(1);
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("AE Service"),
        subject: "Nuova richiesta da Mario Rossi",
        replyTo: "mario@test.com",
        text: expect.stringContaining("Ciao, vorrei un preventivo"),
        to: expect.anything(),
      }),
    );
  });
});
