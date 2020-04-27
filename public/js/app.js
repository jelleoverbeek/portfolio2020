(function () {
  const autoplay = {
    vids: document.querySelectorAll("video"),
    updateControls: function (vid, status) {
      const playingBtn = vid.parentElement.querySelector(".playing");
      const pausedBtn = vid.parentElement.querySelector(".paused");

      if (status === "playing") {
        playingBtn.classList.remove("hidden");
        pausedBtn.classList.add("hidden");
      } else if (status === "paused") {
        playingBtn.classList.add("hidden");
        pausedBtn.classList.remove("hidden");
      }
    },
    play: function (vid) {
      vid
        .play()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
    isVidVisible: function (vids, scrollPos) {
      vids.forEach((vid) => {
        let rect = vid.getBoundingClientRect();
        let topVisible = vid.offsetTop > scrollPos;
        let bottomVisible =
          vid.offsetTop + rect.height < scrollPos + window.innerHeight;

        if (topVisible && bottomVisible) {
          this.play(vid);
          this.updateControls(vid, "playing");
        } else {
          vid.pause();
          this.updateControls(vid, "paused");
        }
      });
    },
    init: function () {
      window.addEventListener("scroll", (ev) => {
        this.isVidVisible(this.vids, window.pageYOffset);
      });

      this.isVidVisible(this.vids, window.pageYOffset);
    },
  };

  autoplay.init();
})();
