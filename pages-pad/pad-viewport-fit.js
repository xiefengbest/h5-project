(function () {
    var DESIGN_W = 1280;
    var DESIGN_H = 800;
    var root = document.documentElement;
    var host = null;
    var stage = null;
    var ready = false;

    function getViewportSize() {
        var vv = window.visualViewport;
        if (vv) {
            return { width: vv.width, height: vv.height };
        }
        return { width: window.innerWidth, height: window.innerHeight };
    }

    function ensureStage() {
        if (stage && host) {
            return;
        }
        var body = document.body;
        if (!body) {
            return;
        }
        if (document.getElementById('pad-viewport-stage')) {
            stage = document.getElementById('pad-viewport-stage');
            host = document.getElementById('pad-viewport-host');
            return;
        }
        host = document.createElement('div');
        host.id = 'pad-viewport-host';
        stage = document.createElement('div');
        stage.id = 'pad-viewport-stage';
        if (body.classList.contains('pad-scroll-body')) {
            body.classList.remove('pad-scroll-body');
            stage.classList.add('pad-scroll-body');
        }
        while (body.firstChild) {
            stage.appendChild(body.firstChild);
        }
        host.appendChild(stage);
        body.appendChild(host);
    }

    function clearInline(el, props) {
        if (!el) {
            return;
        }
        props.forEach(function (prop) {
            el.style.removeProperty(prop);
        });
    }

    function applyPassthroughLayout() {
        var body = document.body;
        if (!body || !host || !stage) {
            return;
        }
        var bodyStyle = getComputedStyle(body);
        clearInline(host, [
            'width', 'height', 'min-height', 'max-height', 'margin', 'overflow',
            'flex', 'display', 'flex-direction', 'flex-shrink', 'position'
        ]);
        clearInline(stage, [
            'width', 'height', 'min-height', 'max-height', 'margin', 'overflow',
            'flex', 'display', 'flex-direction', 'transform', 'transform-origin',
            'max-width', 'box-shadow', 'background'
        ]);

        if (bodyStyle.display === 'flex') {
            host.style.flex = '1';
            host.style.display = 'flex';
            host.style.flexDirection = 'column';
            host.style.minHeight = '0';
            host.style.width = '100%';
            stage.style.flex = '1';
            stage.style.display = 'flex';
            stage.style.flexDirection = 'column';
            stage.style.minHeight = '0';
            stage.style.width = '100%';
            if (bodyStyle.maxWidth !== 'none') {
                stage.style.maxWidth = bodyStyle.maxWidth;
            }
            stage.style.overflow = bodyStyle.overflow;
        } else {
            host.style.width = '100%';
            host.style.minHeight = '100%';
            stage.style.width = '100%';
            stage.style.minHeight = '100%';
            if (bodyStyle.maxWidth !== 'none') {
                stage.style.maxWidth = bodyStyle.maxWidth;
                stage.style.margin = '0 auto';
            }
        }
    }

    function applyPadViewportFit() {
        if (!ready) {
            return;
        }
        ensureStage();
        var body = document.body;
        if (!body || !host || !stage) {
            return;
        }

        var vp = getViewportSize();
        var scale = Math.min(vp.width / DESIGN_W, vp.height / DESIGN_H, 1);
        var scaledW = DESIGN_W * scale;
        var scaledH = DESIGN_H * scale;

        if (scale >= 0.999) {
            root.classList.remove('pad-viewport-fit-active');
            host.classList.remove('is-scaled');
            stage.classList.remove('is-scaled');
            root.style.removeProperty('--pad-viewport-scale');
            clearInline(root, ['height', 'overflow', 'width']);
            clearInline(body, [
                'margin', 'padding', 'width', 'height', 'min-height', 'max-height',
                'overflow', 'display', 'justify-content', 'align-items', 'background'
            ]);
            applyPassthroughLayout();
            window.dispatchEvent(new Event('padviewportfitchange'));
            return;
        }

        root.classList.add('pad-viewport-fit-active');
        host.classList.add('is-scaled');
        stage.classList.add('is-scaled');
        root.style.setProperty('--pad-viewport-scale', String(scale));

        root.style.width = '100%';
        root.style.height = vp.height + 'px';
        root.style.overflow = 'hidden';

        body.style.margin = '0';
        body.style.padding = '0';
        body.style.width = '100%';
        body.style.height = vp.height + 'px';
        body.style.minHeight = vp.height + 'px';
        body.style.maxHeight = vp.height + 'px';
        body.style.overflow = 'hidden';
        body.style.display = 'flex';
        body.style.justifyContent = 'center';
        body.style.alignItems = 'flex-start';
        body.style.background =
            getComputedStyle(root).getPropertyValue('--demo-frame-bg').trim() || '#d4d4d8';

        clearInline(host, ['flex', 'display', 'flex-direction', 'position']);
        host.style.width = scaledW + 'px';
        host.style.height = scaledH + 'px';
        host.style.margin = '0 auto';
        host.style.flexShrink = '0';
        host.style.overflow = 'hidden';
        host.style.position = 'relative';

        clearInline(stage, ['flex', 'max-width', 'margin']);
        stage.style.width = DESIGN_W + 'px';
        stage.style.height = DESIGN_H + 'px';
        stage.style.minHeight = DESIGN_H + 'px';
        stage.style.maxHeight = DESIGN_H + 'px';
        stage.style.transform = 'scale(' + scale + ')';
        stage.style.transformOrigin = 'top left';
        stage.style.overflow = 'hidden';

        if (stage.classList.contains('pad-scroll-body')) {
            stage.style.overflowY = 'auto';
            stage.style.overflowX = 'hidden';
        } else {
            stage.style.display = 'flex';
            stage.style.flexDirection = 'column';
        }

        window.dispatchEvent(new Event('padviewportfitchange'));
    }

    function init() {
        ready = true;
        applyPadViewportFit();
    }

    window.padViewportFit = {
        isActive: function () {
            return root.classList.contains('pad-viewport-fit-active');
        },
        getDesignSize: function () {
            return { width: DESIGN_W, height: DESIGN_H };
        },
        getFrameSize: function () {
            if (stage && stage.classList.contains('is-scaled')) {
                return { width: DESIGN_W, height: DESIGN_H };
            }
            if (stage) {
                return {
                    width: stage.clientWidth || DESIGN_W,
                    height: stage.clientHeight || DESIGN_H
                };
            }
            return { width: DESIGN_W, height: DESIGN_H };
        },
        apply: applyPadViewportFit
    };

    window.addEventListener('resize', applyPadViewportFit);
    window.addEventListener('orientationchange', function () {
        window.setTimeout(applyPadViewportFit, 150);
    });
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', applyPadViewportFit);
        window.visualViewport.addEventListener('scroll', applyPadViewportFit);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
