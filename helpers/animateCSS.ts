const animateCSS = (element: string, animation: string) => {
  const nodes = document.querySelectorAll(element);

  const promises: Array<Promise<unknown>> = [];

  nodes.forEach((node) => {
    const prom = new Promise((resolve) => {
      const animationName = `animate__${animation}`;

      node?.classList.add("animate__animated", animationName);

      const handleAnimationEnd = (ev: Event) => {
        ev.stopPropagation();
        node?.classList.remove("animate__animated", animationName);
        resolve("Animation Ended");
      };

      node?.addEventListener("animationend", handleAnimationEnd, {
        once: true,
      });
    });
    promises.push(prom);
  });

  return Promise.all(promises);
};

export default animateCSS;
