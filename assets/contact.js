(() => {
  const decode = (codes) => String.fromCharCode(...codes);
  const contact = {
    email: [
      117, 108, 121, 115, 115, 101, 46, 109, 105, 122, 114, 97, 104, 105, 64,
      103, 109, 97, 105, 108, 46, 99, 111, 109,
    ],
    gmailCompose: [
      104, 116, 116, 112, 115, 58, 47, 47, 109, 97, 105, 108, 46, 103, 111,
      111, 103, 108, 101, 46, 99, 111, 109, 47, 109, 97, 105, 108, 47, 63,
      118, 105, 101, 119, 61, 99, 109, 38, 102, 115, 61, 49, 38, 116, 111,
      61,
    ],
    whatsappDisplay: [43, 57, 55, 50, 32, 53, 48, 32, 53, 53, 53, 32, 56, 50, 57, 52],
    whatsappDigits: [57, 55, 50, 53, 48, 53, 53, 53, 56, 50, 57, 52],
  };

  const list = document.querySelector("[data-contact-page]");
  if (!list) return;

  const icon = (path) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "contact-icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    path.forEach((d) => {
      const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
      element.setAttribute("d", d);
      svg.append(element);
    });
    return svg;
  };

  const outlink = () =>
    icon(["M7 17 17 7", "M9 7h8v8", "M17 17H7V7"]);

  const contactRow = ({ label, value, href, iconPath }) => {
    const link = document.createElement("a");
    link.className = "contact-row";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.append(icon(iconPath));

    const text = document.createElement("span");
    text.className = "contact-text";
    const labelNode = document.createElement("span");
    labelNode.className = "contact-label";
    labelNode.textContent = label;
    const valueNode = document.createElement("span");
    valueNode.className = "contact-value";
    valueNode.textContent = value;
    text.append(labelNode, valueNode);

    link.append(text, outlink());
    return link;
  };

  list.append(
    contactRow({
      label: "Email",
      value: decode(contact.email),
      href: `${decode(contact.gmailCompose)}${encodeURIComponent(decode(contact.email))}`,
      iconPath: ["M4 6h16v12H4z", "m4 7 8 6 8-6"],
    }),
    contactRow({
      label: "WhatsApp",
      value: decode(contact.whatsappDisplay),
      href: `https://wa.me/${decode(contact.whatsappDigits)}`,
      iconPath: [
        "M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z",
        "M9 8.5c.4 3 2.5 5.1 5.5 5.8",
      ],
    }),
  );
})();
