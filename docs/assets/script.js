/* Progressive chart enhancements; report tables remain static. */
(() => {
  "use strict";
  const results = window.GAZETTE_RESULTS;
  const metricButtons = Array.from(document.querySelectorAll("[data-metric]"));
  const chart = document.getElementById("benchmark-chart");

  if (Array.isArray(results) && results.length && chart) {
    const format = (metric, value) => metric === "accuracy"
      ? (value * 100).toFixed(2) + "%" : value.toFixed(4);

    function renderChart(metric) {
      chart.style.setProperty("--chart-color", metric === "accuracy" ? "#4c72b0" : "#dd8452");
      const fragment = document.createDocumentFragment();
      results.slice().sort((a, b) => b[metric] - a[metric]).forEach((result, index) => {
        const row = document.createElement("div");
        row.className = "benchmark-row" + (index === 0 ? " is-leading" : "");
        const name = document.createElement("span");
        name.className = "benchmark-name";
        name.textContent = result.shortName;
        const track = document.createElement("span");
        track.className = "benchmark-track";
        track.tabIndex = 0;
        track.dataset.tip = result.shortName + " · Test " + (metric === "accuracy" ? "Accuracy: " + (result.accuracy * 100).toFixed(8) + "%" : "Macro F1: " + result.f1.toFixed(8));
        const bar = document.createElement("span");
        bar.className = "benchmark-bar";
        bar.style.setProperty("--bar-width", result[metric] * 100 + "%");
        bar.setAttribute("aria-hidden", "true");
        track.append(bar);
        const score = document.createElement("strong");
        score.textContent = format(metric, result[metric]);
        row.append(name, track, score);
        fragment.append(row);
      });
      chart.replaceChildren(fragment);
      document.getElementById("chart-axis-max").textContent = metric === "accuracy" ? "100% Accuracy" : "1.0 Macro F1";
      document.getElementById("benchmark-caption").textContent = "Test " + (metric === "accuracy" ? "Accuracy" : "Macro F1") + " for five validation-selected models. Bars start at zero. Hover or focus a bar for its value.";
      metricButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.metric === metric)));
    }

    metricButtons.forEach(button => button.addEventListener("click", () => renderChart(button.dataset.metric)));
    document.querySelector(".metric-controls").hidden = false;
    renderChart("f1");
  }

  document.querySelectorAll("[data-switcher]").forEach(group => {
    const buttons = Array.from(group.querySelectorAll(".view-controls [data-panel]"));
    const panels = Array.from(group.children).filter(child => child.classList.contains("view-panel"));
    const controls = group.querySelector(".view-controls");
    if (!buttons.length || !panels.length || !controls) return;
    panels.forEach((panel, index) => { panel.hidden = index !== 0; });
    controls.hidden = false;
    buttons.forEach(button => button.addEventListener("click", () => {
      panels.forEach(panel => { panel.hidden = panel.id !== button.dataset.panel; });
      buttons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
      scheduleNavigation();
    }));
  });

  const frequencies = window.GAZETTE_EDA?.frequencies;
  const frequencyChart = document.getElementById("frequency-chart");
  const topicSelect = document.getElementById("frequency-topic");
  const viewSelect = document.getElementById("frequency-view");
  if (frequencies && frequencyChart && topicSelect && viewSelect) {
    const viewLabels = { all: "all tokens", filtered: "standard stopwords hidden", trial: "after cleaning trial" };
    function renderFrequencies() {
      const rows = frequencies[topicSelect.value]?.[viewSelect.value];
      if (!rows?.length) return;
      const maxCount = Math.max(...rows.map(row => row[1]));
      const fragment = document.createDocumentFragment();
      rows.forEach(([word, count]) => {
        const row = document.createElement("div");
        row.className = "frequency-row";
        const label = document.createElement("span");
        label.textContent = word;
        const track = document.createElement("span");
        track.className = "frequency-track";
        track.tabIndex = 0;
        track.dataset.tip = topicSelect.value + " · " + word + ": " + count.toLocaleString("en-US") + " token occurrences";
        const bar = document.createElement("span");
        bar.style.setProperty("--bar-width", count / maxCount * 100 + "%");
        track.append(bar);
        const value = document.createElement("strong");
        value.textContent = count.toLocaleString("en-US");
        row.append(label, track, value);
        fragment.append(row);
      });
      frequencyChart.replaceChildren(fragment);
      document.getElementById("frequency-description").textContent = topicSelect.value + " · " + viewLabels[viewSelect.value] + " · top " + rows.length;
      scheduleNavigation();
    }
    topicSelect.addEventListener("change", renderFrequencies);
    viewSelect.addEventListener("change", renderFrequencies);
    document.querySelector(".frequency-controls").hidden = false;
  }

  const dialog = document.getElementById("plate-dialog");
  const image = document.getElementById("plate-image");
  const close = document.getElementById("close-plate");
  let figureOpener = null;
  let previousBodyOverflow = "";
  if (dialog && image && close && typeof dialog.showModal === "function") {
    document.querySelectorAll("a[data-figure]").forEach(link => {
      link.setAttribute("aria-haspopup", "dialog");
      link.addEventListener("click", event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        figureOpener = link;
        image.src = link.href;
        image.alt = link.querySelector("img")?.alt || link.dataset.caption || "Recorded experiment figure";
        document.getElementById("plate-description").textContent = link.dataset.caption || "Recorded experiment figure.";
        document.getElementById("plate-original").href = link.href;
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        close.focus();
      });
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = previousBodyOverflow;
      image.removeAttribute("src");
      figureOpener?.focus({ preventScroll: true });
    });
  }

  // Chart bars and split segments share one ink-style annotation.
  const tooltip = document.createElement("div");
  tooltip.id = "data-annotation";
  tooltip.className = "data-annotation";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.append(tooltip);
  let tooltipOwner = null;
  function hideTooltip() {
    tooltipOwner?.removeAttribute("aria-describedby");
    tooltipOwner = null;
    tooltip.hidden = true;
  }
  function showTooltip(owner) {
    hideTooltip();
    tooltipOwner = owner;
    tooltip.textContent = owner.dataset.tip;
    tooltip.hidden = false;
    owner.setAttribute("aria-describedby", tooltip.id);
    const box = owner.getBoundingClientRect();
    const tip = tooltip.getBoundingClientRect();
    const left = Math.max(12, Math.min(innerWidth - tip.width - 12, box.left + box.width / 2 - tip.width / 2));
    const top = box.bottom + tip.height + 12 < innerHeight ? box.bottom + 8 : Math.max(8, box.top - tip.height - 8);
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }
  document.addEventListener("pointerover", event => {
    const owner = event.target.closest("[data-tip]");
    if (owner && !owner.contains(event.relatedTarget)) showTooltip(owner);
  });
  document.addEventListener("pointerout", event => {
    if (tooltipOwner && event.target.closest("[data-tip]") === tooltipOwner && !tooltipOwner.contains(event.relatedTarget)) hideTooltip();
  });
  document.addEventListener("focusin", event => {
    const owner = event.target.closest("[data-tip]");
    if (owner) showTooltip(owner);
  });
  document.addEventListener("focusout", hideTooltip);
  document.addEventListener("keydown", event => { if (event.key === "Escape") hideTooltip(); });
  function updateTooltipPosition() {
    if (tooltipOwner === document.activeElement) {
      const box = tooltipOwner.getBoundingClientRect();
      if (box.bottom > 0 && box.top < innerHeight) showTooltip(tooltipOwner);
      else hideTooltip();
    } else hideTooltip();
  }
  window.addEventListener("scroll", updateTooltipPosition, { passive: true });
  window.addEventListener("resize", updateTooltipPosition);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      reveal.unobserve(entry.target);
    }), { threshold: 0.08 });
    document.querySelectorAll(".benchmark-figure, .class-distribution, .split-figure, .frequency-figure, .cleaning-chart, .research-figure").forEach(element => {
      element.classList.add("reveal-pending");
      reveal.observe(element);
    });
    reducedMotion.addEventListener("change", event => {
      if (event.matches) document.querySelectorAll(".reveal-pending").forEach(element => element.classList.add("is-revealed"));
    });
  }

  // Select the last section whose heading passed below the fixed navigation.
  // This also stays correct inside long sections, on upward scrolling, and at page end.
  const nav = document.querySelector(".edition-nav");
  const links = Array.from(nav?.querySelectorAll("a[href^='#']") || []);
  const sections = links.map(link => ({ link, section: document.querySelector(link.hash) })).filter(item => item.section);
  let activeLink = null;
  let queued = false;
  function updateNavigation() {
    queued = false;
    if (!nav || !sections.length) return;
    const line = nav.getBoundingClientRect().height + 30;
    let selected = sections[0];
    for (const item of sections) {
      if (item.section.getBoundingClientRect().top <= line) selected = item;
      else break;
    }
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) selected = sections[sections.length - 1];
    if (selected.link === activeLink) return;
    activeLink = selected.link;
    links.forEach(link => {
      if (link === activeLink) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    document.querySelectorAll("[data-chapter-link]").forEach(link => {
      if (link.hash === activeLink.hash) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    const target = nav.scrollLeft + activeLink.getBoundingClientRect().left - nav.getBoundingClientRect().left - (nav.clientWidth - activeLink.offsetWidth) / 2;
    nav.scrollTo({ left: target, behavior: reducedMotion.matches ? "instant" : "smooth" });
  }
  function scheduleNavigation() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateNavigation);
  }
  function measureNavigation() {
    if (nav) document.documentElement.style.setProperty("--nav-height", nav.getBoundingClientRect().height + "px");
    scheduleNavigation();
  }
  if (nav) {
    window.addEventListener("scroll", scheduleNavigation, { passive: true });
    window.addEventListener("resize", measureNavigation);
    window.addEventListener("load", measureNavigation);
    if ("ResizeObserver" in window) new ResizeObserver(measureNavigation).observe(nav);
    measureNavigation();
  }
})();
