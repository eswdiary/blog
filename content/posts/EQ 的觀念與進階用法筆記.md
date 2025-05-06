+++
title = "EQ 的觀念與進階用法筆記"
date = "2025-04-12"
[taxonomies]
tags=["Sound Design（聲音設計）"]
+++

<iframe width="560" height="315" src="https://www.youtube.com/embed/r7556ybtdW0?si=6tLgo7jf7ahg-E6y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

{% note(header="Note") %}
筆記因可能的版權問題刪去之嵌入影像內容，皆有附上來源與連結方便查閱。
{% end %}

## Conclusion

- IR（Impulse response）與 EQ 本質上相同
- EQ cut 其實是為了強調「兩側的頻率」，比起 boost 還可以保留較多的 headroom，因此假設為了突顯 Bass 與 Guitar 的音色，可以稍削減兩者中間的頻率範圍。
- 將音色簡略分為 fundamental 和 harmonic（texture），EQ cut 以「**不影響 textur**e」為主，與其說是減去，不如說是「**精簡化頻率內容**」
- 🔥大師級延伸：
	- 利用 minimum phase 會對訊號產生部份 phase cancelling 的特性，配合 compressor 控制動態，達成同時上下 expansion 的效果，也挖空低頻與中低頻的分界的同時，也突顯 bass 與中頻的定位。

---

## Practice

### Q Factor

Q factor 是一個物理名詞，表示「頻率的能量 / 能量消散的頻率」，如下：

$$
Q = \frac{\text{Energy Stored}}{\text{Energy dissipated per cycle}}
$$

簡單來說，「**當能量維持的情況下，Q 值越大則消散速度越慢**」，這也是為何較大的 Q 值會造成尖銳的聲響。

[01:51](https://youtu.be/r7556ybtdW0?t=111)

---

### IR（Impulse response）與 EQ 本質上相同

IR 表示在聲音上表示「**一個系統的聲音特性**」。

> *用一個時間趨近於零，而信號趨近無限大的信號（俗稱脈衝，故也有人稱為脈衝響應），打進一個系統，來量測他的輸出。把這個結果利用傅立葉轉換從時域轉換成頻域，就可以得到這個系統的頻率響應了。[^1]*

當提到 FFT（Fast Fourier Transform） 分析，表示「波型 → 頻譜」的轉換；在使用 EQ 的時候，實際上也是因為對特定頻率的增衰減，對波型造成了變化，反過來說，我們看到的「**EQ curves 是 IR 經過 FFT 轉換得出來的結果**」。

再更進一步說，**IR 就是 EQ 以時間軸的方式呈現**。

#### IIR、FIR

> *數位濾波器分成兩種類型 – IIR (Infinite Impulse Response) 跟 FIR (Finite Impulse Response)。[^2]*

 IIR 理論上會無限延長對 Impulse 的響應，而 FIR 會根據目前與過去一段時間內的輸入訊號來計算輸出，雖然會因較大量的計算產生延遲，但相對也比較穩定，也就是所謂的 Minimum phase EQ（IIR） 和 Linear phase EQ（FIR） 的區別。

#### Minimum phase（Regular） EQ / Linear Phase EQ

在使用 Linear phase EQ 時，會有 transient 被 fade-in 的 side-effect（**pre-ringing**），主要是因為在播放時，基於 FIR 的算法需要找到前一個可參考點去處理下一個輸出，但尚未播放時並不存在前一個參考點，於是解決辦法便是**將整個 IR 向後延遲，讓音訊先進，延遲一下再過 IR**，這樣就有先前的訊號可以參考了。

---

# References

- [You Don't Understand EQ - YouTube](https://www.youtube.com/watch?v=r7556ybtdW0)
- [EQ Linear Phase vs Minimum Phase - YouTube](https://www.youtube.com/watch?v=efKabAQQsPQ&list=WL&index=2&t=25s)

[^1]: [Monk Custom Enterprise Company 關於IR的那些事兒（Impulse Response application tips)](https://monkcustom.blogspot.com/2019/04/irimpulse-response-application-tips.html)
[^2]: [數位濾波器的學習筆記  Mr.pojenlai](https://pojenlai.wordpress.com/2016/04/10/%E6%95%B8%E4%BD%8D%E6%BF%BE%E6%B3%A2%E5%99%A8%E7%9A%84%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98/)
