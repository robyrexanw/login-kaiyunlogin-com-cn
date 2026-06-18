// 页面辅助模块 - 提示卡片、关键词徽章、访问说明
(function () {
  'use strict';

  // 配置数据（含示例链接与关键词）
  var CONFIG = {
    siteUrl: 'https://login-kaiyunlogin.com.cn',
    keyword: '开云',
    badgeColors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6']
  };

  // 工具：创建元素并设置属性
  function createEl(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    if (html !== undefined) {
      el.innerHTML = html;
    }
    return el;
  }

  // 工具：随机取色
  function randomColor() {
    var colors = CONFIG.badgeColors;
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // 生成一条访问说明（内嵌 URL 与关键词）
  function createAccessNote() {
    var note = createEl('div', { class: 'access-note' });
    var p = createEl('p', {}, '欢迎访问 ' + CONFIG.siteUrl + ' 。本站关键词为 “' + CONFIG.keyword + '”，请遵守使用说明。');
    note.appendChild(p);
    return note;
  }

  // 生成提示卡片（含标题、描述、链接）
  function createTipCard(title, desc, link) {
    var card = createEl('div', { class: 'tip-card' });
    var h3 = createEl('h3', {}, title);
    var p = createEl('p', {}, desc);
    var a = createEl('a', { href: link, target: '_blank', rel: 'noopener' }, '了解更多');
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(a);
    return card;
  }

  // 生成关键词徽章
  function createBadge(text) {
    var badge = createEl('span', { class: 'keyword-badge' }, text);
    badge.style.backgroundColor = randomColor();
    badge.style.color = '#fff';
    badge.style.padding = '4px 10px';
    badge.style.borderRadius = '12px';
    badge.style.display = 'inline-block';
    badge.style.margin = '4px';
    badge.style.fontSize = '14px';
    return badge;
  }

  // 生成一组徽章（围绕核心关键词）
  function createBadgeGroup(keyword) {
    var group = createEl('div', { class: 'badge-group' });
    var related = [keyword, '平台', '服务', '安全', '快捷'];
    related.forEach(function (w) {
      group.appendChild(createBadge(w));
    });
    return group;
  }

  // 主容器组装
  function buildWidget() {
    // 避免重复插入
    if (document.getElementById('site-helper-widget')) return;

    var container = createEl('div', { id: 'site-helper-widget' });
    container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;font-family:Arial,sans-serif;max-width:320px;background:#fff;border:1px solid #ddd;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);padding:16px;';

    // 访问说明
    container.appendChild(createAccessNote());

    // 关键词徽章组
    container.appendChild(createBadgeGroup(CONFIG.keyword));

    // 提示卡片
    container.appendChild(createTipCard(
      '快速指引',
      '使用 ' + CONFIG.keyword + ' 相关功能时，请确认您的网络环境。',
      CONFIG.siteUrl
    ));

    container.appendChild(createTipCard(
      '安全提示',
      '请认准官方网址 ' + CONFIG.siteUrl + ' ，谨防仿冒。',
      CONFIG.siteUrl + '/help'
    ));

    // 关闭按钮
    var closeBtn = createEl('button', { class: 'helper-close' }, '✕');
    closeBtn.style.cssText = 'position:absolute;top:8px;right:8px;border:none;background:transparent;font-size:18px;cursor:pointer;color:#999;';
    closeBtn.addEventListener('click', function () {
      container.style.display = 'none';
    });
    container.appendChild(closeBtn);

    document.body.appendChild(container);
  }

  // 页面加载完成后执行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();