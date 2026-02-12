
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/" className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="prose dark:prose-invert">
        <p>
          Your privacy is important to us. This Privacy Policy explains how 복세편살 ("we," "us," or "our") collects, uses, discloses, and protects your information when you use our dynamic QR code generation, management, and tracking services (the "Service").
        </p>
        <h2>1. Information We Collect</h2>
        <p>
          We collect various types of information in connection with the Service, including:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong> When you register for an account, we collect personal information such as your email address through third-party authentication providers (e.g., Kakao).
          </li>
          <li>
            <strong>QR Code Data:</strong> Information related to the QR codes you create, such as titles, destination URLs, and creation dates.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you access and use the Service, including your IP address, browser type, operating system, and interaction with the Service.
          </li>
        </ul>
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our Service.</li>
          <li>Improve, personalize, and expand our Service.</li>
          <li>Understand and analyze how you use our Service.</li>
          <li>Develop new products, services, features, and functionality.</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.</li>
          <li>Process your transactions and manage your accounts.</li>
          <li>Find and prevent fraud.</li>
        </ul>
        <h2>3. Sharing Your Information</h2>
        <p>
          We may share your information in the following situations:
        </p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work.
          </li>
          <li>
            <strong>For Business Transfers:</strong> We may share or transfer your personal information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
          </li>
          <li>
            <strong>With Affiliates:</strong> We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.
          </li>
          <li>
            <strong>For Legal Reasons:</strong> We may disclose your information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.
          </li>
        </ul>
        <h2>4. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>
        <h2>5. Your Data Protection Rights</h2>
        <p>
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul>
          <li>The right to access, update or delete the information we have on you.</li>
          <li>The right of rectification.</li>
          <li>The right to object.</li>
          <li>The right of restriction.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent.</li>
        </ul>
        <h2>6. Third-Party Websites</h2>
        <p>
          The Service may contain links to third-party websites that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </p>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at boksepyunsal24@gmail.com.
        </p>
      </div>
    </div>
  )
}
