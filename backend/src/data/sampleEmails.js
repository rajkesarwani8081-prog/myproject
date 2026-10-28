export const sampleEmails = [
  {
    from: "security@paypal-verify.com",
    subject: "URGENT: Verify Your Account Now!",
    body: "Your PayPal account has been suspended. Click here immediately to verify: http://192.168.1.1/paypal-login",
    links: ["http://192.168.1.1/paypal-login"],
    attachments: 0,
    type: "phishing"
  },
  {
    from: "team@company.com",
    subject: "Meeting Tomorrow at 2 PM",
    body: "Hi team, just a reminder about our quarterly review meeting tomorrow at 2 PM in Conference Room B.",
    links: [],
    attachments: 0,
    type: "legitimate"
  },
  {
    from: "banking@secure-login.xyz",
    subject: "Your Account Will Be Closed",
    body: "URGENT ACTION REQUIRED! Your bank account will be closed in 24 hours unless you confirm your identity. Click here: http://bit.ly/bank123",
    links: ["http://bit.ly/bank123"],
    attachments: 0,
    type: "phishing"
  },
  {
    from: "hr@company.com",
    subject: "Holiday Schedule 2026",
    body: "Please find attached the official holiday schedule. Let us know if you have any questions.",
    links: [],
    attachments: 1,
    type: "legitimate"
  },
  {
    from: "admin@microsoft-security.com",
    subject: "Security Alert: Unusual Login Activity",
    body: "We detected suspicious activity on your Microsoft account. Verify your password immediately: https://login-microsoft.com/verify",
    links: ["https://login-microsoft.com/verify"],
    attachments: 0,
    type: "phishing"
  },
  {
    from: "invoice@supplier.net",
    subject: "Invoice #12345",
    body: "Please review and pay the attached invoice at your earliest convenience. Payment terms: Net 30 days.",
    links: [],
    attachments: 1,
    type: "legitimate"
  }
];