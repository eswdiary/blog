$(document).ready(function() {
	$("#pagepiling").pagepiling({
		verticalCentered: true,
		// sectionsColor: ["#282828", "#282828", "#282828"],
		loopTop: true,
		loopBottom: true,
		direction: "vertical",
		easing: "swing",
		navigation: false,
	});
});

document.addEventListener('DOMContentLoaded', () => {
    // 假設非 pagepiling 頁面有特定標記
    if (!document.querySelector('#pagepiling')) {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
    }
});