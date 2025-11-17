(function(){"use strict";function t(){const e=document.getElementById("clock-time"),t=document.getElementById("clock-date"),n=document.getElementById("clock-weekday");if(!e||!t||!n)return;const o=["日","一","二","三","四","五","六"];function s(){const s=new Date,i=String(s.getHours()).padStart(2,"0"),a=String(s.getMinutes()).padStart(2,"0"),r=String(s.getSeconds()).padStart(2,"0");e.textContent=`${i}:${a}:${r}`;const c=s.getFullYear(),l=String(s.getMonth()+1).padStart(2,"0"),d=String(s.getDate()).padStart(2,"0");t.textContent=`${c}年${l}月${d}日`;const u=o[s.getDay()];n.textContent=`星期${u}`}s(),setInterval(s,1e3)}function n(){const e=document.getElementById("weather-container"),n=document.querySelector(".home-sidebar");if(!e)return;const t={city:n?.dataset.weatherCity||"Beijing",apiKey:n?.dataset.weatherApiKey||"",apiUrl:n?.dataset.weatherApiUrl||"https://api.openweathermap.org/data/2.5/weather"};if(!t.apiKey){e.innerHTML=`
                <div class="weather-content">
                    <div class="weather-desc">请在 config.toml 中配置天气 API</div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span>推荐使用：</span>
                            <span>OpenWeatherMap</span>
                        </div>
                    </div>
                </div>
            `;return}async function s(){try{e.innerHTML='<div class="weather-loading">加载中...</div>';const s=`${t.apiUrl}?q=${t.city}&appid=${t.apiKey}&units=metric&lang=zh_cn`,n=await fetch(s);if(!n.ok)throw new Error("天气数据获取失败");const i=await n.json();o(i)}catch(t){console.error("天气获取错误:",t),e.innerHTML=`
                    <div class="weather-content">
                        <div class="weather-desc">天气数据获取失败</div>
                        <div class="weather-details">
                            <div class="weather-detail-item">
                                <span>错误：</span>
                                <span>${t.message}</span>
                            </div>
                        </div>
                    </div>
                `}}function o(t){const n=i(t.weather[0].main),s=Math.round(t.main.temp),o=t.weather[0].description,a=t.main.humidity,r=t.wind?.speed||0;e.innerHTML=`
                <div class="weather-content">
                    <div class="weather-main">
                        <div class="weather-temp">${s}°C</div>
                        <div class="weather-icon">${n}</div>
                    </div>
                    <div class="weather-desc">${o}</div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <span>湿度：</span>
                            <span>${a}%</span>
                        </div>
                        <div class="weather-detail-item">
                            <span>风速：</span>
                            <span>${r} m/s</span>
                        </div>
                    </div>
                </div>
            `}function i(e){const t={Clear:"☀️",Clouds:"☁️",Rain:"🌧️",Drizzle:"🌦️",Thunderstorm:"⛈️",Snow:"❄️",Mist:"🌫️",Fog:"🌫️"};return t[e]||"🌤️"}s(),setInterval(s,30*60*1e3)}function s(){const f=document.querySelector(".music-widget");let s=[];if(f&&f.dataset.musicList)try{s=JSON.parse(f.dataset.musicList)}catch(e){console.error("音乐列表解析失败:",e)}(!s||s.length===0)&&(s=[]);const e=new Audio;e.preload="auto",e.crossOrigin="anonymous";let i=0,t=!1;const c=document.getElementById("music-title"),l=document.getElementById("music-artist"),n=document.getElementById("music-play-pause"),_=document.getElementById("music-prev"),y=document.getElementById("music-next"),h=document.getElementById("music-progress-bar"),j=document.getElementById("music-progress-fill"),v=document.getElementById("music-current-time"),r=document.getElementById("music-duration"),u=document.getElementById("music-volume"),b=document.getElementById("music-volume-value");if(!e||!n)return;function d(o){if(o<0||o>=s.length)return;i=o;const a=s[o];t&&(e.pause(),t=!1,n&&(n.textContent="▶")),e.src="",e.load(),e.src=a.url,c&&(c.textContent=a.title),l&&(l.textContent=a.artist||"未知艺术家"),e.load(),O()}function O(){const e=document.querySelectorAll(".playlist-item");e.forEach((e,t)=>{t===i?e.classList.add("active"):e.classList.remove("active")})}function x(){if(t)e.pause(),n.textContent="▶",t=!1;else{e.readyState===0&&e.load();const s=e.play();s!==0[0]&&s.then(()=>{n.textContent="⏸",t=!0}).catch(e=>{console.error("播放失败:",e),t=!1,n.textContent="▶",alert("音乐播放失败，请检查音乐文件或网络连接")})}}function C(){const n=i-1<0?s.length-1:i-1;d(n),t&&e.play()}function g(){const n=(i+1)%s.length;d(n),t&&e.play()}function E(){if(e.duration){const t=e.currentTime/e.duration*100;j&&(j.style.width=t+"%"),v&&(v.textContent=p(e.currentTime)),r&&(r.textContent=p(e.duration))}}function p(e){if(isNaN(e))return"0:00";const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${String(n).padStart(2,"0")}`}n.addEventListener("click",x),_&&_.addEventListener("click",C),y&&y.addEventListener("click",g),h&&h.addEventListener("click",t=>{const n=h.getBoundingClientRect(),s=(t.clientX-n.left)/n.width;e.currentTime=s*e.duration}),u&&(u.addEventListener("input",t=>{const n=t.target.value/100;e.volume=n,b&&(b.textContent=t.target.value+"%")}),e.volume=u.value/100),e.addEventListener("timeupdate",E),e.addEventListener("ended",g),e.addEventListener("loadedmetadata",()=>{r&&(r.textContent=p(e.duration))}),e.addEventListener("error",e=>{console.error("音频加载错误:",e),t&&(t=!1,n&&(n.textContent="▶")),alert("音频加载失败，请检查文件是否存在或网络连接")}),e.addEventListener("stalled",()=>{console.warn("音频加载停滞，尝试重新加载"),t&&(e.load(),e.play().catch(e=>{console.error("重新播放失败:",e)}))}),e.addEventListener("waiting",()=>{console.log("音频缓冲中...")}),e.addEventListener("canplaythrough",()=>{console.log("音频可以完整播放")}),e.addEventListener("pause",()=>{t&&e.readyState<3&&console.warn("音频意外暂停，可能是网络问题")});let m=0,a=0,A=setInterval(()=>{if(t){const s=e.currentTime;if(s===m&&s>0&&!e.paused){if(a++,a>=3){console.warn("检测到音频卡住，尝试恢复播放");const o=s,i=!e.paused;e.load(),e.addEventListener("loadeddata",function s(){e.currentTime=o,i&&e.play().catch(e=>{console.error("恢复播放失败:",e),t=!1,n&&(n.textContent="▶")}),e.removeEventListener("loadeddata",s)},{once:!0}),a=0}}else a=0;m=s}else a=0,m=0},1e3);const o=document.getElementById("playlist-toggle"),w=document.getElementById("playlist-content"),k=document.querySelectorAll(".playlist-item");if(o&&w){let e=!1;o.addEventListener("click",t=>{t.stopPropagation(),e=!e,w.classList.toggle("collapsed",e),o.classList.toggle("collapsed",e),o.textContent=e?"▶":"▼"});const t=o.closest(".playlist-header");t&&t.addEventListener("click",e=>{e.target!==o&&o.click()})}k.forEach((n,s)=>{n.addEventListener("click",()=>{d(s),t&&e.play()})}),s.length>0?d(0):(c&&(c.textContent="暂无音乐"),l&&(l.textContent="请将 MP3 文件放入 static/mp3 文件夹"))}function e(){document.querySelector(".page.home")&&(t(),n(),s())}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()