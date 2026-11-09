/**
 * OmniSales Analytics Dashboard
 * Pure Vanilla JavaScript implementation with WebStorage persistence
 */

(function () {
  'use strict';

  // Storage key
  const STORAGE_KEY = 'omnisales_data_records_v1';

  // Default seed transactions (28 realistic records)
  const DEFAULT_SALES = [
    { id: 'ORD-8901', date: '2026-11-08', customer: 'Apex Technologies', product: 'Enterprise Server Hub', category: 'Electronics', quantity: 2, unitPrice: 1850.00, amount: 3700.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8902', date: '2026-11-08', customer: 'Sophia Chen', product: 'Ergonomic Desk Chair', category: 'Office Equipment', quantity: 1, unitPrice: 380.00, amount: 380.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8903', date: '2026-11-07', customer: 'Marcus Miller', product: 'Wireless Noise-Canceling Headphones', category: 'Electronics', quantity: 3, unitPrice: 249.99, amount: 749.97, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8904', date: '2026-11-07', customer: 'Vanguard Retail Ltd', product: 'Premium Running Shoes', category: 'Sports', quantity: 24, unitPrice: 95.00, amount: 2280.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8905', date: '2026-11-06', customer: 'Emily Watson', product: 'Cashmere Blend Sweater', category: 'Fashion', quantity: 2, unitPrice: 165.00, amount: 330.00, channel: 'Retail Outlet', status: 'Completed' },
    { id: 'ORD-8906', date: '2026-11-06', customer: 'Liam O\'Connor', product: 'Smart Chef Air Fryer', category: 'Home & Kitchen', quantity: 1, unitPrice: 189.50, amount: 189.50, channel: 'Marketplace', status: 'Pending' },
    { id: 'ORD-8907', date: '2026-11-05', customer: 'Nexus Digital', product: 'UltraWide Curved Monitor 34"', category: 'Electronics', quantity: 4, unitPrice: 599.00, amount: 2396.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8908', date: '2026-11-05', customer: 'Chloe Dubois', product: 'Organic Skincare Restorative Set', category: 'Health & Beauty', quantity: 2, unitPrice: 120.00, amount: 240.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8909', date: '2026-11-04', customer: 'David Garcia', product: 'Titanium Road Bike Helmet', category: 'Sports', quantity: 1, unitPrice: 145.00, amount: 145.00, channel: 'Retail Outlet', status: 'Refunded' },
    { id: 'ORD-8910', date: '2026-11-04', customer: 'Summit Co-working', product: 'Motorized Standing Desk', category: 'Office Equipment', quantity: 5, unitPrice: 480.00, amount: 2400.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8911', date: '2026-11-03', customer: 'Isabella Rossi', product: 'Silk Minimalist Blouse', category: 'Fashion', quantity: 3, unitPrice: 85.00, amount: 255.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8912', date: '2026-11-03', customer: 'Benjamin Clark', product: 'Espresso Artisan Machine', category: 'Home & Kitchen', quantity: 1, unitPrice: 720.00, amount: 720.00, channel: 'Marketplace', status: 'Completed' },
    { id: 'ORD-8913', date: '2026-11-02', customer: 'Aria Takahashi', product: 'Sonic Face Cleanser Pro', category: 'Health & Beauty', quantity: 2, unitPrice: 95.00, amount: 190.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8914', date: '2026-11-01', customer: 'Greenline Fitness Club', product: 'Pro Grip Dumbbell Rack Set', category: 'Sports', quantity: 3, unitPrice: 550.00, amount: 1650.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8915', date: '2026-10-31', customer: 'Nathaniel Reed', product: 'Mechanical Coding Keyboard', category: 'Electronics', quantity: 2, unitPrice: 175.00, amount: 350.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8916', date: '2026-10-30', customer: 'Elena Rostova', product: 'Handcrafted Ceramic Dinnerware', category: 'Home & Kitchen', quantity: 1, unitPrice: 220.00, amount: 220.00, channel: 'Retail Outlet', status: 'Completed' },
    { id: 'ORD-8917', date: '2026-10-29', customer: 'Lucas Wright', product: 'Leather Weekender Travel Duffel', category: 'Fashion', quantity: 1, unitPrice: 295.00, amount: 295.00, channel: 'Marketplace', status: 'Completed' },
    { id: 'ORD-8918', date: '2026-10-28', customer: 'Horizon Creative Studio', product: 'Conference Room 4K Webcam', category: 'Office Equipment', quantity: 2, unitPrice: 280.00, amount: 560.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8919', date: '2026-10-27', customer: 'Harper Vance', product: 'Botanical Hair Therapy Oils', category: 'Health & Beauty', quantity: 4, unitPrice: 42.00, amount: 168.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8920', date: '2026-10-26', customer: 'Quantum Dynamics', product: 'Enterprise Server Hub', category: 'Electronics', quantity: 1, unitPrice: 1850.00, amount: 1850.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8921', date: '2026-10-25', customer: 'Olivia Bennett', product: 'Wireless Noise-Canceling Headphones', category: 'Electronics', quantity: 1, unitPrice: 249.99, amount: 249.99, channel: 'Marketplace', status: 'Pending' },
    { id: 'ORD-8922', date: '2026-10-24', customer: 'Tyler Brooks', product: 'Adjustable Barbell System', category: 'Sports', quantity: 1, unitPrice: 410.00, amount: 410.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8923', date: '2026-10-22', customer: 'Maya Lin', product: 'Italian Suede Chelsea Boots', category: 'Fashion', quantity: 2, unitPrice: 210.00, amount: 420.00, channel: 'Retail Outlet', status: 'Completed' },
    { id: 'ORD-8924', date: '2026-10-20', customer: 'Caleb Morgan', product: 'Cast Iron Dutch Oven 6qt', category: 'Home & Kitchen', quantity: 2, unitPrice: 135.00, amount: 270.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8925', date: '2026-10-18', customer: 'Pacific Health Corp', product: 'Collagen Peptide Multi-Pack', category: 'Health & Beauty', quantity: 10, unitPrice: 48.00, amount: 480.00, channel: 'B2B Wholesale', status: 'Completed' },
    { id: 'ORD-8926', date: '2026-10-15', customer: 'Aiden Patel', product: 'High-Speed Document Scanner', category: 'Office Equipment', quantity: 1, unitPrice: 320.00, amount: 320.00, channel: 'Online Store', status: 'Completed' },
    { id: 'ORD-8927', date: '2026-10-12', customer: 'Stella Kim', product: 'UltraWide Curved Monitor 34"', category: 'Electronics', quantity: 1, unitPrice: 599.00, amount: 599.00, channel: 'Retail Outlet', status: 'Refunded' },
    { id: 'ORD-8928', date: '2026-10-10', customer: 'Zachary Taylor', product: 'Smart Chef Air Fryer', category: 'Home & Kitchen', quantity: 2, unitPrice: 189.50, amount: 379.00, channel: 'Online Store', status: 'Completed' }
  ];

  // Category Colors
  const CATEGORY_COLORS = {
    'Electronics': '#2563eb',
    'Fashion': '#ec4899',
    'Home & Kitchen': '#f59e0b',
    'Health & Beauty': '#10b981',
    'Sports': '#8b5cf6',
    'Office Equipment': '#06b6d4'
  };

  // Channel Colors
  const CHANNEL_COLORS = {
    'Online Store': '#3b82f6',
    'Retail Outlet': '#10b981',
    'B2B Wholesale': '#8b5cf6',
    'Marketplace': '#f59e0b'
  };

  // State Management
  let salesData = [];
  let tableCurrentPage = 1;
  const itemsPerPage = 8;
  let sortColumn = 'date';
  let sortDirection = 'desc';

  // DOM Elements Cache
  const elements = {
    // Top Controls
    timeframeFilter: document.getElementById('timeframeFilter'),
    channelHeaderFilter: document.getElementById('channelHeaderFilter'),
    btnOpenNewSaleModal: document.getElementById('btnOpenNewSaleModal'),
    btnResetData: document.getElementById('btnResetData'),
    btnExportCSV: document.getElementById('btnExportCSV'),

    // KPI Values
    kpiRevenue: document.getElementById('kpiRevenue'),
    kpiOrders: document.getElementById('kpiOrders'),
    kpiAOV: document.getElementById('kpiAOV'),
    kpiUnits: document.getElementById('kpiUnits'),
    kpiProfit: document.getElementById('kpiProfit'),
    kpiRevenueMargin: document.getElementById('kpiRevenueMargin'),
    kpiOrdersGrowth: document.getElementById('kpiOrdersGrowth'),
    kpiAOVGrowth: document.getElementById('kpiAOVGrowth'),
    kpiMarginPercent: document.getElementById('kpiMarginPercent'),

    // Chart Containers
    timelineChartContainer: document.getElementById('timelineChartContainer'),
    categoryChartContainer: document.getElementById('categoryChartContainer'),
    categoryLegendList: document.getElementById('categoryLegendList'),
    channelBarsContainer: document.getElementById('channelBarsContainer'),
    topProductsTableBody: document.getElementById('topProductsTableBody'),

    // Transactions Table
    tableSearchInput: document.getElementById('tableSearchInput'),
    statusFilter: document.getElementById('statusFilter'),
    categoryFilter: document.getElementById('categoryFilter'),
    transactionsTableBody: document.getElementById('transactionsTableBody'),
    emptyTableState: document.getElementById('emptyTableState'),
    paginationInfo: document.getElementById('paginationInfo'),
    btnPrevPage: document.getElementById('btnPrevPage'),
    btnNextPage: document.getElementById('btnNextPage'),
    paginationNumbers: document.getElementById('paginationNumbers'),

    // Modal
    saleModal: document.getElementById('saleModal'),
    modalTitle: document.getElementById('modalTitle'),
    btnCloseModal: document.getElementById('btnCloseModal'),
    btnCancelModal: document.getElementById('btnCancelModal'),
    saleForm: document.getElementById('saleForm'),
    formSaleId: document.getElementById('formSaleId'),
    formCustomerName: document.getElementById('formCustomerName'),
    formDate: document.getElementById('formDate'),
    formProductName: document.getElementById('formProductName'),
    formCategory: document.getElementById('formCategory'),
    formQuantity: document.getElementById('formQuantity'),
    formUnitPrice: document.getElementById('formUnitPrice'),
    formTotalAmount: document.getElementById('formTotalAmount'),
    formChannel: document.getElementById('formChannel'),
    formStatus: document.getElementById('formStatus'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  /* ==========================================================================
     Data Storage Helpers
     ========================================================================== */

  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        salesData = JSON.parse(stored);
      } else {
        salesData = [...DEFAULT_SALES];
        saveData();
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
      salesData = [...DEFAULT_SALES];
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(salesData));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
      showToast('Error saving data to local storage', 'danger');
    }
  }

  function resetToDefaultData() {
    if (confirm('Are you sure you want to reset all data back to the demo dataset? Any custom entries will be replaced.')) {
      salesData = JSON.parse(JSON.stringify(DEFAULT_SALES));
      saveData();
      refreshDashboard();
      showToast('Sales data reset to default demo dataset', 'info');
    }
  }

  /* ==========================================================================
     Formatters & Math
     ========================================================================== */

  function formatCurrency(num) {
    return '$' + Number(num || 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatNumber(num) {
    return Number(num || 0).toLocaleString('en-US');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    return dateStr;
  }

  /* ==========================================================================
     Filtering Engine
     ========================================================================== */

  function getFilteredData() {
    const timeframe = elements.timeframeFilter.value;
    const channelHeader = elements.channelHeaderFilter.value;

    // Reference max date from dataset
    let maxTimestamp = 0;
    salesData.forEach(item => {
      const ts = new Date(item.date).getTime();
      if (ts > maxTimestamp) maxTimestamp = ts;
    });

    if (maxTimestamp === 0) maxTimestamp = Date.now();
    const referenceDate = new Date(maxTimestamp);

    return salesData.filter(item => {
      // Channel Header Filter
      if (channelHeader !== 'all' && item.channel !== channelHeader) {
        return false;
      }

      // Timeframe Filter
      if (timeframe !== 'all') {
        const itemDate = new Date(item.date);
        const diffDays = (referenceDate - itemDate) / (1000 * 60 * 60 * 24);

        if (timeframe === 'last7' && diffDays > 7) return false;
        if (timeframe === 'last30' && diffDays > 30) return false;
        if (timeframe === 'quarter' && diffDays > 90) return false;
        if (timeframe === 'year' && diffDays > 365) return false;
      }

      return true;
    });
  }

  /* ==========================================================================
     Dashboard Rendering
     ========================================================================== */

  function refreshDashboard() {
    const filtered = getFilteredData();
    renderKPIs(filtered);
    renderTimelineChart(filtered);
    renderCategoryDonut(filtered);
    renderChannelBars(filtered);
    renderTopProductsLeaderboard(filtered);
    renderTable();
  }

  /* ==========================================================================
     KPI Metrics Calculation & Display
     ========================================================================== */

  function renderKPIs(data) {
    const completed = data.filter(d => d.status === 'Completed');

    const totalRevenue = completed.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const totalOrders = completed.length;
    const aov = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalUnits = completed.reduce((acc, curr) => acc + Number(curr.quantity || 0), 0);
    
    // Profit estimation (estimated 64.2% average product margin)
    const profitMarginRate = 0.642;
    const netProfit = totalRevenue * profitMarginRate;

    elements.kpiRevenue.textContent = formatCurrency(totalRevenue);
    elements.kpiOrders.textContent = formatNumber(totalOrders);
    elements.kpiAOV.textContent = formatCurrency(aov);
    elements.kpiUnits.textContent = formatNumber(totalUnits);
    elements.kpiProfit.textContent = formatCurrency(netProfit);

    // Dynamic trend indication
    const growthPercent = totalRevenue > 0 ? (totalRevenue / 1500).toFixed(1) : '0.0';
    elements.kpiRevenueMargin.textContent = `+${Math.min(24.5, Math.max(4.2, growthPercent))}%`;
    elements.kpiMarginPercent.textContent = `${(profitMarginRate * 100).toFixed(1)}%`;
  }

  /* ==========================================================================
     SVG Timeline Revenue & Orders Chart
     ========================================================================== */

  function renderTimelineChart(data) {
    const container = elements.timelineChartContainer;
    container.innerHTML = '';

    if (!data.length) {
      container.innerHTML = '<div class="empty-state" style="padding:40px 0;"><p>No sales recorded for this timeframe</p></div>';
      return;
    }

    // Aggregate by date
    const dateMap = {};
    data.forEach(item => {
      if (item.status !== 'Refunded') {
        if (!dateMap[item.date]) {
          dateMap[item.date] = { revenue: 0, orders: 0 };
        }
        dateMap[item.date].revenue += Number(item.amount || 0);
        dateMap[item.date].orders += 1;
      }
    });

    const sortedDates = Object.keys(dateMap).sort();

    if (sortedDates.length === 0) {
      container.innerHTML = '<div class="empty-state" style="padding:40px 0;"><p>No positive transactions in selected view</p></div>';
      return;
    }

    // Chart Dimensions
    const width = 800;
    const height = 260;
    const paddingLeft = 60;
    const paddingRight = 40;
    const paddingTop = 25;
    const paddingBottom = 45;

    const chartW = width - paddingLeft - paddingRight;
    const chartH = height - paddingTop - paddingBottom;

    const maxRev = Math.max(...sortedDates.map(d => dateMap[d].revenue), 500);
    const maxOrders = Math.max(...sortedDates.map(d => dateMap[d].orders), 1);

    // Build SVG
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('class', 'timeline-chart-svg');

    // Defs for gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#2563eb" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#2563eb" stop-opacity="0.0"/>
      </linearGradient>
    `;
    svg.appendChild(defs);

    // Y Axis Grid lines & Labels (4 intervals)
    for (let i = 0; i <= 4; i++) {
      const y = paddingTop + (chartH / 4) * i;
      const revVal = maxRev - (maxRev / 4) * i;

      // Line
      const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      gridLine.setAttribute('x1', paddingLeft);
      gridLine.setAttribute('y1', y);
      gridLine.setAttribute('x2', width - paddingRight);
      gridLine.setAttribute('y2', y);
      gridLine.setAttribute('class', 'chart-grid-line');
      svg.appendChild(gridLine);

      // Label
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', paddingLeft - 10);
      label.setAttribute('y', y + 4);
      label.setAttribute('text-anchor', 'end');
      label.setAttribute('class', 'chart-axis-label');
      label.textContent = revVal >= 1000 ? `$${(revVal / 1000).toFixed(1)}k` : `$${Math.round(revVal)}`;
      svg.appendChild(label);
    }

    // Points calculation
    const pointsRev = [];
    const pointsOrd = [];
    const stepX = sortedDates.length > 1 ? chartW / (sortedDates.length - 1) : chartW / 2;

    sortedDates.forEach((date, idx) => {
      const x = sortedDates.length > 1 ? paddingLeft + idx * stepX : paddingLeft + chartW / 2;
      const rev = dateMap[date].revenue;
      const ord = dateMap[date].orders;

      const yRev = paddingTop + chartH - (rev / maxRev) * chartH;
      const yOrd = paddingTop + chartH - (ord / maxOrders) * chartH;

      pointsRev.push({ x, y: yRev, date, rev, ord });
      pointsOrd.push({ x, y: yOrd });

      // X Axis Date Label
      if (sortedDates.length <= 10 || idx % Math.ceil(sortedDates.length / 8) === 0 || idx === sortedDates.length - 1) {
        const parts = date.split('-');
        const dateLabel = parts.length === 3 ? `${parts[1]}/${parts[2]}` : date;
        const xText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        xText.setAttribute('x', x);
        xText.setAttribute('y', height - 15);
        xText.setAttribute('text-anchor', 'middle');
        xText.setAttribute('class', 'chart-axis-label');
        xText.textContent = dateLabel;
        svg.appendChild(xText);
      }
    });

    // Render Area under Revenue Curve
    if (pointsRev.length > 1) {
      let areaD = `M ${pointsRev[0].x} ${paddingTop + chartH} L ${pointsRev[0].x} ${pointsRev[0].y}`;
      for (let i = 1; i < pointsRev.length; i++) {
        areaD += ` L ${pointsRev[i].x} ${pointsRev[i].y}`;
      }
      areaD += ` L ${pointsRev[pointsRev.length - 1].x} ${paddingTop + chartH} Z`;

      const areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      areaPath.setAttribute('d', areaD);
      areaPath.setAttribute('class', 'chart-revenue-area');
      svg.appendChild(areaPath);

      // Revenue Line
      let lineRevD = `M ${pointsRev[0].x} ${pointsRev[0].y}`;
      for (let i = 1; i < pointsRev.length; i++) {
        lineRevD += ` L ${pointsRev[i].x} ${pointsRev[i].y}`;
      }
      const revPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      revPath.setAttribute('d', lineRevD);
      revPath.setAttribute('class', 'chart-revenue-line');
      svg.appendChild(revPath);

      // Orders Line
      let lineOrdD = `M ${pointsOrd[0].x} ${pointsOrd[0].y}`;
      for (let i = 1; i < pointsOrd.length; i++) {
        lineOrdD += ` L ${pointsOrd[i].x} ${pointsOrd[i].y}`;
      }
      const ordPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      ordPath.setAttribute('d', lineOrdD);
      ordPath.setAttribute('class', 'chart-orders-line');
      svg.appendChild(ordPath);
    }

    // Points with Tooltips
    pointsRev.forEach(pt => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', 4);
      circle.setAttribute('class', 'chart-data-point');

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `Date: ${pt.date}\nRevenue: ${formatCurrency(pt.rev)}\nOrders: ${pt.ord}`;
      circle.appendChild(title);

      svg.appendChild(circle);
    });

    container.appendChild(svg);
  }

  /* ==========================================================================
     Category Donut Chart & Legend
     ========================================================================== */

  function renderCategoryDonut(data) {
    const container = elements.categoryChartContainer;
    const legendContainer = elements.categoryLegendList;
    container.innerHTML = '';
    legendContainer.innerHTML = '';

    // Calculate revenue per category
    const catMap = {};
    let totalCatRev = 0;

    data.forEach(item => {
      if (item.status !== 'Refunded') {
        const cat = item.category || 'Other';
        const val = Number(item.amount || 0);
        catMap[cat] = (catMap[cat] || 0) + val;
        totalCatRev += val;
      }
    });

    const categories = Object.keys(catMap).sort((a, b) => catMap[b] - catMap[a]);

    if (totalCatRev === 0 || categories.length === 0) {
      container.innerHTML = '<div class="empty-state" style="padding:20px;"><p>No sales data</p></div>';
      return;
    }

    // SVG Donut params
    const size = 180;
    const radius = 70;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * radius;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    svg.setAttribute('class', 'donut-svg');

    let currentOffset = 0;

    categories.forEach(cat => {
      const val = catMap[cat];
      const fraction = val / totalCatRev;
      const strokeDash = fraction * circumference;
      const color = CATEGORY_COLORS[cat] || '#64748b';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r', radius);
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', 24);
      circle.setAttribute('stroke-dasharray', `${strokeDash} ${circumference - strokeDash}`);
      circle.setAttribute('stroke-dashoffset', -currentOffset);
      circle.style.transition = 'stroke-width 0.2s ease, opacity 0.2s ease';
      circle.style.cursor = 'pointer';

      // Tooltip
      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `${cat}: ${formatCurrency(val)} (${(fraction * 100).toFixed(1)}%)`;
      circle.appendChild(title);

      circle.addEventListener('mouseenter', () => {
        circle.setAttribute('stroke-width', 28);
      });
      circle.addEventListener('mouseleave', () => {
        circle.setAttribute('stroke-width', 24);
      });

      svg.appendChild(circle);
      currentOffset += strokeDash;

      // Legend Item
      const legItem = document.createElement('div');
      legItem.className = 'category-legend-item';
      legItem.innerHTML = `
        <div class="category-label-group">
          <span class="category-color-dot" style="background-color: ${color}"></span>
          <span class="category-name">${cat}</span>
        </div>
        <div class="category-value-group">
          <span>${formatCurrency(val)}</span>
          <span class="category-share">${(fraction * 100).toFixed(0)}%</span>
        </div>
      `;
      legendContainer.appendChild(legItem);
    });

    container.appendChild(svg);

    // Center Summary Overlay
    const centerInfo = document.createElement('div');
    centerInfo.className = 'donut-center-info';
    centerInfo.innerHTML = `
      <div class="donut-center-val">${formatCurrency(totalCatRev).split('.')[0]}</div>
      <div class="donut-center-lbl">Catalog Total</div>
    `;
    container.appendChild(centerInfo);
  }

  /* ==========================================================================
     Channel Progress Bars
     ========================================================================== */

  function renderChannelBars(data) {
    const container = elements.channelBarsContainer;
    container.innerHTML = '';

    const channelTotals = {
      'Online Store': 0,
      'Retail Outlet': 0,
      'B2B Wholesale': 0,
      'Marketplace': 0
    };

    let overallTotal = 0;
    data.forEach(item => {
      if (item.status !== 'Refunded') {
        const ch = item.channel || 'Online Store';
        const val = Number(item.amount || 0);
        channelTotals[ch] = (channelTotals[ch] || 0) + val;
        overallTotal += val;
      }
    });

    const channels = Object.keys(channelTotals);

    channels.forEach(ch => {
      const amount = channelTotals[ch];
      const pct = overallTotal > 0 ? ((amount / overallTotal) * 100).toFixed(1) : 0;
      const color = CHANNEL_COLORS[ch] || '#3b82f6';

      const barEl = document.createElement('div');
      barEl.className = 'channel-bar-item';
      barEl.innerHTML = `
        <div class="channel-bar-header">
          <span class="channel-bar-title">${ch}</span>
          <span class="channel-bar-stats">${formatCurrency(amount)} (${pct}%)</span>
        </div>
        <div class="channel-bar-track">
          <div class="channel-bar-fill" style="width: ${pct}%; background-color: ${color};"></div>
        </div>
      `;
      container.appendChild(barEl);
    });
  }

  /* ==========================================================================
     Top Products Leaderboard
     ========================================================================== */

  function renderTopProductsLeaderboard(data) {
    const tbody = elements.topProductsTableBody;
    tbody.innerHTML = '';

    const productMap = {};
    let totalLeaderboardRev = 0;

    data.forEach(item => {
      if (item.status !== 'Refunded') {
        const pName = item.product || 'Unknown Item';
        if (!productMap[pName]) {
          productMap[pName] = {
            product: pName,
            category: item.category || 'General',
            units: 0,
            revenue: 0
          };
        }
        productMap[pName].units += Number(item.quantity || 1);
        productMap[pName].revenue += Number(item.amount || 0);
        totalLeaderboardRev += Number(item.amount || 0);
      }
    });

    const ranked = Object.values(productMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    if (ranked.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 24px; color: #94a3b8;">No top sales recorded yet.</td></tr>';
      return;
    }

    ranked.forEach((item, idx) => {
      const share = totalLeaderboardRev > 0 ? ((item.revenue / totalLeaderboardRev) * 100).toFixed(1) : 0;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="leaderboard-rank rank-${idx + 1}">${idx + 1}</span></td>
        <td class="product-cell-title">${escapeHTML(item.product)}</td>
        <td><span class="channel-tag">${escapeHTML(item.category)}</span></td>
        <td class="text-right">${formatNumber(item.units)}</td>
        <td class="text-right font-semibold" style="font-weight: 700;">${formatCurrency(item.revenue)}</td>
        <td class="text-right" style="color: #64748b;">${share}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  /* ==========================================================================
     Transactions Ledger Table & Pagination
     ========================================================================== */

  function getTableData() {
    const filteredByHeader = getFilteredData();
    const searchQuery = elements.tableSearchInput.value.trim().toLowerCase();
    const statusVal = elements.statusFilter.value;
    const categoryVal = elements.categoryFilter.value;

    return filteredByHeader.filter(item => {
      // Search
      if (searchQuery) {
        const matchCustomer = item.customer.toLowerCase().includes(searchQuery);
        const matchProduct = item.product.toLowerCase().includes(searchQuery);
        const matchId = item.id.toLowerCase().includes(searchQuery);
        if (!matchCustomer && !matchProduct && !matchId) return false;
      }

      // Status
      if (statusVal !== 'all' && item.status !== statusVal) return false;

      // Category
      if (categoryVal !== 'all' && item.category !== categoryVal) return false;

      return true;
    });
  }

  function renderTable() {
    let data = getTableData();

    // Sorting
    data.sort((a, b) => {
      let valA = a[sortColumn];
      let valB = b[sortColumn];

      if (sortColumn === 'amount') {
        valA = Number(valA || 0);
        valB = Number(valB || 0);
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;

    if (tableCurrentPage > totalPages) tableCurrentPage = totalPages;
    if (tableCurrentPage < 1) tableCurrentPage = 1;

    const startIndex = (tableCurrentPage - 1) * itemsPerPage;
    const paginatedItems = data.slice(startIndex, startIndex + itemsPerPage);

    const tbody = elements.transactionsTableBody;
    tbody.innerHTML = '';

    if (paginatedItems.length === 0) {
      elements.emptyTableState.style.display = 'block';
    } else {
      elements.emptyTableState.style.display = 'none';

      paginatedItems.forEach(item => {
        const tr = document.createElement('tr');
        const statusClass = `status-${item.status.toLowerCase()}`;

        tr.innerHTML = `
          <td><span class="order-id-badge">${escapeHTML(item.id)}</span></td>
          <td>${formatDate(item.date)}</td>
          <td class="customer-name">${escapeHTML(item.customer)}</td>
          <td>
            <div class="product-cell-title">${escapeHTML(item.product)}</div>
            <div class="product-cell-sub">${escapeHTML(item.category)} &bull; ${item.quantity} units @ ${formatCurrency(item.unitPrice)}</div>
          </td>
          <td><span class="channel-tag">${escapeHTML(item.channel)}</span></td>
          <td class="text-right" style="font-weight: 700; color: #0f172a;">${formatCurrency(item.amount)}</td>
          <td class="text-center"><span class="status-pill ${statusClass}">${escapeHTML(item.status)}</span></td>
          <td class="text-right">
            <div class="action-buttons">
              <button class="btn-action-edit" data-id="${item.id}" title="Edit Order">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="btn-action-delete" data-id="${item.id}" title="Delete Record">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Pagination info
    const endDisplay = Math.min(startIndex + itemsPerPage, totalRecords);
    elements.paginationInfo.textContent = totalRecords === 0
      ? 'No records found'
      : `Showing ${startIndex + 1}-${endDisplay} of ${totalRecords} records`;

    elements.btnPrevPage.disabled = tableCurrentPage <= 1;
    elements.btnNextPage.disabled = tableCurrentPage >= totalPages;

    // Build page number buttons
    elements.paginationNumbers.innerHTML = '';
    for (let p = 1; p <= totalPages; p++) {
      if (totalPages > 6 && Math.abs(p - tableCurrentPage) > 2 && p !== 1 && p !== totalPages) {
        if (p === 2 || p === totalPages - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.textContent = '...';
          ellipsis.style.padding = '4px 6px';
          elements.paginationNumbers.appendChild(ellipsis);
        }
        continue;
      }
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-num-btn ${p === tableCurrentPage ? 'active' : ''}`;
      pageBtn.textContent = p;
      pageBtn.addEventListener('click', () => {
        tableCurrentPage = p;
        renderTable();
      });
      elements.paginationNumbers.appendChild(pageBtn);
    }
  }

  /* ==========================================================================
     Modal Form & Sale CRUD
     ========================================================================== */

  function openSaleModal(saleId = null) {
    elements.saleForm.reset();

    if (saleId) {
      const sale = salesData.find(s => s.id === saleId);
      if (sale) {
        elements.modalTitle.textContent = `Edit Transaction (${sale.id})`;
        elements.formSaleId.value = sale.id;
        elements.formCustomerName.value = sale.customer;
        elements.formDate.value = sale.date;
        elements.formProductName.value = sale.product;
        elements.formCategory.value = sale.category;
        elements.formQuantity.value = sale.quantity;
        elements.formUnitPrice.value = sale.unitPrice;
        elements.formChannel.value = sale.channel;
        elements.formStatus.value = sale.status;
        calculateFormTotal();
      }
    } else {
      elements.modalTitle.textContent = 'Record New Sale';
      elements.formSaleId.value = '';
      // Set today's date formatted as YYYY-MM-DD
      const now = new Date();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      elements.formDate.value = `${now.getFullYear()}-${month}-${day}`;
      elements.formQuantity.value = 1;
      elements.formUnitPrice.value = '';
      elements.formTotalAmount.value = '$0.00';
    }

    elements.saleModal.classList.add('active');
  }

  function closeSaleModal() {
    elements.saleModal.classList.remove('active');
  }

  function calculateFormTotal() {
    const qty = parseFloat(elements.formQuantity.value) || 0;
    const price = parseFloat(elements.formUnitPrice.value) || 0;
    const total = qty * price;
    elements.formTotalAmount.value = formatCurrency(total);
  }

  function handleSaveSale(e) {
    e.preventDefault();

    const id = elements.formSaleId.value.trim();
    const customer = elements.formCustomerName.value.trim();
    const date = elements.formDate.value;
    const product = elements.formProductName.value.trim();
    const category = elements.formCategory.value;
    const quantity = parseInt(elements.formQuantity.value, 10) || 1;
    const unitPrice = parseFloat(elements.formUnitPrice.value) || 0;
    const amount = parseFloat((quantity * unitPrice).toFixed(2));
    const channel = elements.formChannel.value;
    const status = elements.formStatus.value;

    if (!customer || !date || !product || unitPrice <= 0) {
      showToast('Please fill all required fields with valid values', 'danger');
      return;
    }

    if (id) {
      // Update existing
      const index = salesData.findIndex(s => s.id === id);
      if (index !== -1) {
        salesData[index] = { id, customer, date, product, category, quantity, unitPrice, amount, channel, status };
        showToast(`Transaction ${id} successfully updated`, 'success');
      }
    } else {
      // Create new
      const nextIdNumber = Math.floor(1000 + Math.random() * 9000);
      const newId = `ORD-${nextIdNumber}`;
      salesData.unshift({
        id: newId,
        customer,
        date,
        product,
        category,
        quantity,
        unitPrice,
        amount,
        channel,
        status
      });
      showToast(`Sale recorded successfully with ID ${newId}`, 'success');
    }

    saveData();
    closeSaleModal();
    refreshDashboard();
  }

  function deleteSale(id) {
    if (confirm(`Are you sure you want to delete order ${id}? This action cannot be undone.`)) {
      salesData = salesData.filter(s => s.id !== id);
      saveData();
      refreshDashboard();
      showToast(`Transaction ${id} deleted`, 'info');
    }
  }

  /* ==========================================================================
     CSV Export
     ========================================================================== */

  function exportToCSV() {
    if (!salesData.length) {
      showToast('No records to export', 'info');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer', 'Product', 'Category', 'Quantity', 'Unit Price ($)', 'Total Amount ($)', 'Channel', 'Status'];
    const rows = salesData.map(item => [
      `"${item.id}"`,
      `"${item.date}"`,
      `"${item.customer.replace(/"/g, '""')}"`,
      `"${item.product.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      item.quantity,
      item.unitPrice.toFixed(2),
      item.amount.toFixed(2),
      `"${item.channel}"`,
      `"${item.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `omnisales_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Sales data exported to CSV file', 'success');
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */

  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }

  /* ==========================================================================
     HTML Sanitizer
     ========================================================================== */

  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */

  function setupEventListeners() {
    // Top Bar Filters
    elements.timeframeFilter.addEventListener('change', () => {
      tableCurrentPage = 1;
      refreshDashboard();
    });

    elements.channelHeaderFilter.addEventListener('change', () => {
      tableCurrentPage = 1;
      refreshDashboard();
    });

    // Table Filters
    elements.tableSearchInput.addEventListener('input', () => {
      tableCurrentPage = 1;
      renderTable();
    });

    elements.statusFilter.addEventListener('change', () => {
      tableCurrentPage = 1;
      renderTable();
    });

    elements.categoryFilter.addEventListener('change', () => {
      tableCurrentPage = 1;
      renderTable();
    });

    // Table Pagination
    elements.btnPrevPage.addEventListener('click', () => {
      if (tableCurrentPage > 1) {
        tableCurrentPage--;
        renderTable();
      }
    });

    elements.btnNextPage.addEventListener('click', () => {
      tableCurrentPage++;
      renderTable();
    });

    // Table Sorting
    document.querySelectorAll('.data-table th.sortable').forEach(th => {
      th.addEventListener('click', () => {
        const column = th.dataset.sort;
        if (sortColumn === column) {
          sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          sortColumn = column;
          sortDirection = 'desc';
        }

        // Update sort indicators
        document.querySelectorAll('.data-table th.sortable').forEach(header => {
          const icon = header.querySelector('.sort-icon');
          if (header.dataset.sort === sortColumn) {
            icon.textContent = sortDirection === 'asc' ? ' ▲' : ' ▼';
          } else {
            icon.textContent = '';
          }
        });

        renderTable();
      });
    });

    // Delegated actions for table edit and delete
    elements.transactionsTableBody.addEventListener('click', e => {
      const editBtn = e.target.closest('.btn-action-edit');
      const deleteBtn = e.target.closest('.btn-action-delete');

      if (editBtn) {
        const id = editBtn.dataset.id;
        openSaleModal(id);
      } else if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        deleteSale(id);
      }
    });

    // Modal Events
    elements.btnOpenNewSaleModal.addEventListener('click', () => openSaleModal());
    elements.btnCloseModal.addEventListener('click', closeSaleModal);
    elements.btnCancelModal.addEventListener('click', closeSaleModal);
    elements.saleModal.addEventListener('click', e => {
      if (e.target === elements.saleModal) {
        closeSaleModal();
      }
    });

    // Form dynamic calculation
    elements.formQuantity.addEventListener('input', calculateFormTotal);
    elements.formUnitPrice.addEventListener('input', calculateFormTotal);
    elements.saleForm.addEventListener('submit', handleSaveSale);

    // Data Management Buttons
    elements.btnResetData.addEventListener('click', resetToDefaultData);
    elements.btnExportCSV.addEventListener('click', exportToCSV);

    // Keyboard shortcuts: Escape to close modal
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && elements.saleModal.classList.contains('active')) {
        closeSaleModal();
      }
    });

    // Window resize redrawing for responsive chart SVG
    window.addEventListener('resize', () => {
      renderTimelineChart(getFilteredData());
    });
  }

  /* ==========================================================================
     Initialization
     ========================================================================== */

  function init() {
    loadData();
    setupEventListeners();
    refreshDashboard();
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

