const Terms = () => {
  const sections = [
    {
      title: "Intellectual property and art ownership",
      body: "All artwork, designs, text, images, and graphics on this website are the intellectual property of Artly and are protected by international copyright laws.",
      points: [
        "Personal use only — unless otherwise agreed in writing, all physical prints, originals, and digital downloads are for personal, non-commercial use.",
        "No redistribution — you may not copy, resell, distribute, license, or exploit any artwork for commercial purposes without an explicit license agreement.",
        "No modifications — you may not alter, edit, or incorporate our designs into other products or files for resale.",
      ],
    },
    {
      title: "Pricing and payments",
      body: "We strive to ensure all pricing and product details displayed on the website are accurate, but occasional errors may occur.",
      points: [
        "Currency — all prices are listed in BDT and are subject to change without notice.",
        "Payment methods — we accept secure payments via credit/debit cards, PayPal, and other supported methods.",
        "Order acceptance — Artly reserves the right to refuse or cancel any order, including for pricing or stock errors. Paid orders that are cancelled receive a full refund.",
      ],
    },
    {
      title: "Shipping, delivery, and digital downloads",
      body: "We take immense care in packaging your artwork to ensure it arrives safely at your doorstep.",
      points: [
        "Physical shipping — processing typically takes 2–5 business days; shipping fees and delivery times are calculated at checkout based on location.",
        "We are not responsible for delays caused by customs, postal strikes, or incorrect addresses provided by the buyer.",
        "Digital downloads are delivered instantly, or via an emailed link, once payment is confirmed. It's your responsibility to have the right software to open the file.",
      ],
    },
    {
      title: "Returns, refunds, and cancellations",
      body: "Because of the delicate nature of physical artwork and the instant access of digital files, we operate under a strict return policy.",
      points: [
        "Original art and limited edition prints — all sales are final.",
        "Damaged items — contact us within 7 days of delivery with photos of the damaged packaging and item, and we'll arrange a replacement or refund.",
        "Digital files — all sales of downloadable assets, templates, or files are non-refundable.",
      ],
    },
    {
      title: "Limitation of liability",
      body: "The website and all products are provided on an as-is and as-available basis without any warranties, express or implied. Artly shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our products, website access, or the inability to access our services.",
      points: [],
    },
    {
      title: "Updates to these terms",
      body: "We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted directly on this page with an updated \"Last revised\" date. Continued use of the website after any change means you accept the new terms.",
      points: [],
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-14">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Legal
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-primary mt-3 mb-5 rounded-sm">
            Terms &amp; Conditions
          </h1>
          <p className="text-text-muted leading-relaxed max-w-xl">
            Welcome to Artly. These terms govern your use of our website and
            the purchase of any artwork, prints, digital assets, or custom
            commissions. By accessing our website or making a purchase, you
            agree to be bound by these terms.
          </p>
        </div>

        <div className="h-px bg-border mb-14" />

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, i) => (
            <div key={section.title} className="flex gap-5">
              {/* Gallery-placard style number */}
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-sm bg-primary flex items-center justify-center">
                  <span className="font-serif text-bg-light text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="flex-1 pt-1">
                <h2 className="font-serif text-xl text-text-dark mb-2 rounded-sm">
                  {section.title}
                </h2>
                <p className="text-text-muted leading-relaxed mb-4">
                  {section.body}
                </p>

                {section.points.length > 0 && (
                  <div className="space-y-3">
                    {section.points.map((point, idx) => (
                      <div
                        key={idx}
                        className="bg-bg-card border border-border rounded-sm px-4 py-3"
                      >
                        <p className="text-sm text-text-dark leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-border my-14" />

        {/* Footer / contact */}
        <div className="bg-bg-card border border-border rounded-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-serif text-lg text-text-dark mb-1 rounded-sm">
              Questions about these terms?
            </p>
            <p className="text-sm text-text-muted">
              Reach us at{" "}
              <span className="text-primary">support@artly.com</span>
            </p>
          </div>
          <span className="text-xs text-text-muted rounded-sm bg-bg-light border border-border px-3 py-1.5 self-start sm:self-auto">
            Last revised: July 16, 2026
          </span>
        </div>
      </div>
    </div>
  );
};

export default Terms;