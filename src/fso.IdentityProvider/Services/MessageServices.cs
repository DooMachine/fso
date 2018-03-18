using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace fso.IdentityProvider.Services
{
    // This class is used by the application to send Email and SMS
    // when you turn on two-factor authentication in ASP.NET Identity.
    // For more details see this link https://go.microsoft.com/fwlink/?LinkID=532713
    public class AuthMessageSender : IEmailSender, ISmsSender
    {
        private readonly MailSettings mailSettings;
        public AuthMessageSender(
            IOptions<MailSettings> mailSet
        )
        {
            mailSettings = mailSet.Value;
        }
        public Task SendEmailAsync(string email, string subject, string message)
        {
            SmtpClient client = new SmtpClient(mailSettings.Host);
            client.Port = mailSettings.Port;
            client.EnableSsl = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(mailSettings.AccountsMailAdress,mailSettings.AccountMailPassword);
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(mailSettings.AccountsMailAdress);
            mailMessage.To.Add(email);
            mailMessage.Body = message;
            mailMessage.Subject = subject;
            client.SendCompleted += (s, e) => {
                client.Dispose();
                mailMessage.Dispose();                
            };
            return client.SendMailAsync(mailMessage);
        }

        public Task SendSmsAsync(string number, string message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }
}
