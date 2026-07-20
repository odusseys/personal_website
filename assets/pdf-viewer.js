(() => {
  const PAPERS = {
    actcam: {
      title: "ActCam: Zero-Shot Joint Camera and 3D Motion Control for Video Generation",
      meta: "",
      url: "../assets/papers/actcam.pdf",
    },
    "image-editing-models": {
      title: "Image Editing Models are Numerical Simulators",
      meta: "",
      url: "../assets/papers/image-editing-models-numerical-simulators.pdf",
    },
    elasticdino: {
      title: "ElasticDino: Dense Semantic Features using Elastic Deformation",
      meta: "",
      url: "../assets/papers/elasticdino.pdf",
    },
    max4zero: {
      title: "MaX4Zero: Masked Extended Attention for Zero-Shot Virtual Try-On In The Wild",
      meta: "",
      url: "../assets/papers/max4zero.pdf",
    },
  };

  const els = {
    buttons: Array.from(document.querySelectorAll("[data-paper-id]")),
    intro: document.querySelector("[data-pdf-intro]"),
    viewer: document.querySelector("[data-pdf-viewer]"),
    title: document.querySelector("[data-pdf-title]"),
    meta: document.querySelector("[data-pdf-meta]"),
    open: document.querySelector("[data-pdf-open]"),
    download: document.querySelector("[data-pdf-download]"),
    frame: document.querySelector("[data-pdf-frame]"),
    message: document.querySelector("[data-pdf-message]"),
  };

  if (!els.intro || !els.viewer || !els.frame || els.buttons.length === 0) return;

  const resolveUrl = (url) => new URL(url, window.location.href).href;

  const setActiveButton = (paperId) => {
    els.buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.paperId === paperId));
    });
  };

  const showIntro = () => {
    setActiveButton("index");
    els.frame.removeAttribute("src");
    els.viewer.hidden = true;
    els.intro.hidden = false;
  };

  const loadPaper = (paperId) => {
    const paper = PAPERS[paperId];
    if (!paper) {
      showIntro();
      return;
    }

    const pdfUrl = resolveUrl(paper.url);
    setActiveButton(paperId);
    els.intro.hidden = true;
    els.viewer.hidden = false;
    els.title.textContent = paper.title;
    els.meta.textContent = paper.meta;
    els.meta.hidden = !paper.meta;
    els.open.href = pdfUrl;
    els.download.href = pdfUrl;
    els.download.setAttribute("download", `${paperId}.pdf`);
    els.frame.src = pdfUrl;
    els.message.textContent = "";
  };

  const getPaperIdFromUrl = () => {
    if (!window.location.hash) return "index";

    try {
      return decodeURIComponent(window.location.hash.slice(1)) || "index";
    } catch {
      return "index";
    }
  };

  const showSelection = (paperId) => {
    if (paperId === "index") showIntro();
    else loadPaper(paperId);
  };

  els.buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const paperId = button.dataset.paperId;
      const nextHash = `#${encodeURIComponent(paperId)}`;

      if (window.location.hash === nextHash) showSelection(paperId);
      else window.location.hash = nextHash;
    });
  });

  window.addEventListener("hashchange", () => {
    showSelection(getPaperIdFromUrl());
  });

  showSelection(getPaperIdFromUrl());
})();
