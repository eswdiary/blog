document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("back-to-top");

    if (backToTopButton) {
        // 滾動事件：控制淡入淡出
        window.onscroll = function () {
            if (
                document.body.scrollTop > 200 ||
                document.documentElement.scrollTop > 200
            ) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        };

        // 點擊事件：平滑回到頂部
        backToTopButton.addEventListener("click", function () {
            console.log("Back to top clicked!"); // 除錯用
            if ("scrollBehavior" in document.documentElement.style) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                window.scrollTo(0, 0); // 無平滑滾動後備
            }
        });
    } else {
        console.error("Element with ID 'back-to-top' not found.");
    }
});