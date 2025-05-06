+++
title = "Saturation 的觀念與進階用法筆記"
date = "2025-04-11"
[taxonomies]
tags=["Sound Design（聲音設計）"]
+++

<iframe width="560" height="315" src="https://www.youtube.com/embed/qQPYMfcPzY0?si=OTE9KJMemy2v1hN4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

{% note(header="Note") %}
筆記因可能的版權問題刪去之嵌入影像內容，皆有附上來源與連結方便查閱。
{% end %}

## Conclusion

> *"Nature is LPF."*

- 高頻泛音在大多情況下由低頻泛音主導，也就是說，**控制低頻就可以控制 Saturation**，或者更廣義的說，**控制特定頻率的振幅就可以控制 Saturation 的音色**，就是所謂的 Pre-saturation EQ。
	- ⭐進階延伸：Pre-saturation compressor
	- 🔥大師級延伸：因為人耳會有*自動從泛音腦補基頻的現像*[^1]，因此採取「**先削減特定頻率 → Saturation → 再增益一樣的特定頻率**」達成乾淨控制泛音和強調該頻率的目地。
- Saturation 不只增加新的泛音頻率，也會衰弱原有的頻率。
- 沒有規定要在一個 plugin 內處理所有染色，試著以 **多段式** 的方式塑造 saturation 的音色。
- Saturation 本質上是一種不可預測的 synthesize 技術

---

## Practice

### 波的能量、振幅與頻率

聲波屬於機械波，能量和 **振幅的平方（a²）** 成正比。

$$
E \propto A^2 f^2
$$

一般可能會直觀的覺得能量大就是振幅（音量）越大，但其實兩者並不相同（至少在物理層面上），振幅（Amplitude）是「**能量大小的表徵**」，能量的計算方式為振幅的平方，是表達一種抽像的物理量，單位常見為焦耳（Joule, J），或功率單位：瓦特（Watt, W）。

或許可以想成：
- **振幅高 → 空氣粒子震動得大 → 能量多**
- **振幅小 → 空氣震動得小 → 能量少**
---

按這個說法，假定在總能量不變的狀況下，「**當 `A` 越高，則 `f` 越低**」，反之亦然，這簡略了說明**為何泛音總是以右斜方向衰減**（部份樂器與控無調性為例外）。

[01:23](https://youtu.be/qQPYMfcPzY0?t=83)

---

### 低頻越多破越多？

依照低頻能量通常較多的現像來看，面對以能量觸發的 Saturator 來說，直覺看來應該就是低頻越多會越破，但……真的一定如此嗎？

Waveshaper 的運作邏輯是**根據波型（振幅），看不到頻率**，如下圖，我們可以分成兩種情況來討論：

1. 超過 ceiling 而被 non-linear amplify 的部份
2. 低於 ceiling 被 linear amplify 的部份

先談第一種，過大導致其原先的波型的振幅間距被縮小，其振幅縮小，自然**音量也變小**。

[06:35](https://youtu.be/qQPYMfcPzY0?t=395)


第二種，接近 0 的波被線性放大，反而有可能超過原先振幅較大的部份，導致泛音來源不全然是來自低頻的現像。

[07:18](https://youtu.be/qQPYMfcPzY0?t=438)

總結來說，Saturation 跟頻率本身關係不大，主要還是看頻率的振幅大小。

---

# References

- [How To Use Saturation Like a Pro - YouTube](https://www.youtube.com/watch?v=qQPYMfcPzY0)

---

[^1]: Missing fundamental
