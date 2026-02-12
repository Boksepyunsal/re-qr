
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/" className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <div className="prose dark:prose-invert">
        <p>
          Welcome to 복세편살. These Terms of Service govern your use of our dynamic QR code generation, management, and tracking services (the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using our Service, you confirm that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy. If you do not agree with any part of these Terms, you must not use the Service.
        </p>
        <h2>2. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will provide reasonable notice of any material changes. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
        </p>
        <h2>3. Use of the Service</h2>
        <ul>
          <li>You must be at least 13 years old to use the Service.</li>
          <li>You are responsible for maintaining the confidentiality of your account information.</li>
          <li>You agree not to use the Service for any illegal or unauthorized purpose.</li>
          <li>You are solely responsible for the content of the QR codes you generate and the URLs they link to.</li>
        </ul>
        <h2>4. Intellectual Property</h2>
        <p>
          All intellectual property rights in the Service and its content (excluding user-generated content) are owned by 복세편살 or its licensors.
        </p>
        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>
        <h2>6. Disclaimers</h2>
        <p>
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the Service.
        </p>
        <h2>7. Limitation of Liability</h2>
        <p>
          In no event shall 복세편살, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
        </p>
        <h2>8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of Seoul, Republic of Korea, without regard to its conflict of law provisions.
        </p>
        <h2>9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at boksepyunsal24@gmail.com.
        </p>
      </div>
    </div>
  )
}
