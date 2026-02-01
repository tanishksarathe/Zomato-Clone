import sendEmail from '../config/email.js';

export const sendForgotPasswordOTPService = (to, otp) => {

    const subject = `Your OTP to Reset Your Grab My Meal Password`;
    const message = `<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Email Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#ff6b35; padding:20px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                Grab My Meal
              </h1>
              <p style="margin:5px 0 0; color:#ffe6dc; font-size:14px;">
                Fresh • Fast • Reliable
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 25px; color:#333333;">

              <h2 style="margin-top:0; font-size:22px; color:#222222;">
                Verify Your Identity
              </h2>

              <p style="font-size:15px; line-height:1.6;">
                We received a request to <strong>reset or change your password</strong> for your
                <strong>Grab My Meal</strong> account.
              </p>

              <p style="font-size:15px; line-height:1.6;">
                Please use the One-Time Password (OTP) below to proceed:
              </p>

              <!-- OTP Box -->
              <div style="margin:25px 0; text-align:center;">
                <span style="
                  display:inline-block;
                  background-color:#fff3ee;
                  color:#ff6b35;
                  font-size:28px;
                  font-weight:bold;
                  letter-spacing:6px;
                  padding:14px 28px;
                  border-radius:8px;
                  border:1px dashed #ff6b35;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:14px; color:#555555;">
                ⏳ <strong>This OTP is valid for only 2 minutes.</strong>  
                Please do not delay, as it will expire automatically.
              </p>

              <p style="font-size:14px; color:#555555; margin-top:20px;">
                🔒 <strong>Security Notice:</strong><br />
                Never share your OTP with anyone. Grab My Meal will never ask for your OTP
                via phone calls, messages, or emails.
              </p>

              <p style="font-size:14px; color:#555555; margin-top:20px;">
                If you did <strong>not</strong> request a password reset, please ignore this email.
                Your account remains safe.
              </p>

              <p style="font-size:15px; margin-top:30px;">
                Warm regards,<br />
                <strong>Team Grab My Meal</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#fafafa; padding:18px 20px; text-align:center; border-top:1px solid #eeeeee;">
              <p style="margin:0; font-size:12px; color:#777777;">
                © ${new Date().getFullYear()} Grab My Meal. All rights reserved.
              </p>
              <p style="margin:6px 0 0; font-size:12px; color:#999999;">
                This is an automated message. Please do not reply.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Email Container -->

      </td>
    </tr>
  </table>

</body>`;

sendEmail(to, subject, message);

}
