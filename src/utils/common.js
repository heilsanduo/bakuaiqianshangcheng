((w, d) => {
	let dw = d.documentElement.clientWidth || d.body.clientWidth || w.innerWidth;
	let ratio = 7.5;
	d.documentElement.style.fontSize = dw / ratio + 'px';
	w.onresize = () => {
		d.documentElement.style.fontSize = d.documentElement.clientWidth / ratio + 'px'
	};

	$(d).ready(function(){
		var screenHeight = w.innerHeight
		if(navigator.userAgent.indexOf('Android') > -1){
			w.addEventListener("resize", function (e) {
				var nowHeight = w.innerHeight
				if (nowHeight < screenHeight) {
					$("body").css({
						height: screenHeight + 'px',
						transform: 'translateY(-20%)'
					})
				} else {
					$("body").css({
						height: '100%',
						transform: 'translateY(0)'
					})
				}
			});
		}
	});

	$(document).ready(function(){
		$("input").focus(function(e){
			// 需要修复android下的input弹起问题
		});

		$("input").blur(function(e){
			$("body").scrollTop(0)
		})
		w.TOOL = {
			$prefixInteger(num, n){
				if(typeof num !== 'number' || typeof n !== 'number'){
					return num
				}
				return (Array(n).join(0) + num).slice(-n);
			},
			$money(source, length = 3){
				try {
					source = String(source).split(".");
					source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
					return source.join(".");
				} catch(e) {
					return source
				}
			},
			$moneyForm(money) {
				if(!/^(\d{1,})(\.\d{1,})?$/.test(money)){
					return money
				}
				let n = parseFloat(money)
				let fraction = ['角', '分']
				let digit = [
					'零', '壹', '贰', '叁', '肆',
					'伍', '陆', '柒', '捌', '玖'
				];
				let unit = [
					['元', '万', '亿'],
					['', '拾', '佰', '仟']
				];
				let head = n < 0 ? '欠' : ''
				n = Math.abs(n)
				let s = ''
				for (let i = 0; i < fraction.length; i++) {
					s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '')
				}
				s = s || '整'
				n = Math.floor(n)
				for (let i = 0; i < unit[0].length && n > 0; i++) {
					let p = ''
					for (let j = 0; j < unit[1].length && n > 0; j++) {
						p = digit[n % 10] + unit[1][j] + p
						n = Math.floor(n / 10)
					}
					s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
				}
				return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
			}
		}
	});
})(window, document)


$.extend({
	alerting: function(params){
		$('<div class="common-alert"><div class="common-alert-box"><div class="common-alert-title">' + (params.title || '提示') + '</div><div class="common-alert-des">' + (params.des || '请确认您是否要使用，一经确认将无法撤销！') + '</div><div class="common-alert-menu"><div class="common-alert-cancel">' + (params.cancel || '取消') + '</div><div class="common-alert-confirm">' + (params.confirm || '确认') + '</div></div></div></div>').appendTo($("body"));
		setTimeout(function () {
			$(".common-alert").addClass("common-alert-active");
		}, 200);
		return new Promise((resolve, reject) => {
			$("body").on("click", ".common-alert-confirm", function (e) {
				$(".common-alert").removeClass("common-alert-active");
				setTimeout(() => {
					$(".common-alert").remove();
					resolve()
				}, 100)
			});
			$("body").on("click", ".common-alert-cancel", function (e) {
				$(".common-alert").removeClass("common-alert-active");
				setTimeout(() => {
					$(".common-alert").remove();
					reject()
				}, 100)
			});

		})
	},
	loading: function (title) {
		$('<div class="common-loading"><div class="common-loading-box"><div class="common-loading-icon"></div><div class="common-loading-title">' + title || '加载中' + '</div></div></div>').appendTo($("body"));
		setTimeout(function () {
			$(".common-loading").addClass("common-loading-active");
		}, 200);
	},
	hideLoading: function(){
		$(".common-loading").remove();
	},
	callData: function (params) {
		return new Promise((resolve, reject) => {
			var _loading = params.loading || true
			if(_loading){
				$.loading(params.loadingTitle || '提交中')
			}
			$.ajax({
				type: params.type || 'GET',
				async: params.type || true,
				url: params.url,
				data: params.data || {},
				dataType: params.data || 'json',
				timeout: params.timeout || 10000,
				complete(a, b) {
					if(_loading){
						$(".common-loading").remove();
					}
					if (a && a.status === 200) {
						try {
							var _json = JSON.parse(a.responseText)
							$.messageBox({title: _json.msg})
							resolve(_json)
						} catch (e) {
							console.error('AJAX 异常')
						}
					} else {
						$.messageBox({title: a.statusText})
						reject({data: a, msg: a.statusText})
					}
				}
			})
		})
	},
	messageBox: function messageBox(data, callback) {
		$("<div class=\"seller-toast\">\n\t\t\t    <div class=\"seller-toast-box\">\n\t\t\t        <div class=\"".concat(data.status ? '' : 'seller-toast-icon', "\"></div>\n\t\t\t        <div class=\"seller-toast-message\">").concat(data.title, "</div>\n\t\t\t    </div>\n\t\t\t</div>")).appendTo($("body"));
		setTimeout(function () {
			$(".seller-toast").addClass("seller-toast-active");
			setTimeout(function () {
				$(".seller-toast").remove();
			}, data.time || 1500);
			callback && callback();
		}, 200);
	},
	debounce: function debounce(fn, wait) {
		var timeout = null;
		return function () {
			if (timeout !== null) {
				clearTimeout(timeout);
			}

			timeout = setTimeout(fn, wait);
		};
	},
	browser: function browser() {
		var u = navigator.userAgent, app = navigator.appVersion;
		return {         //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}
});

