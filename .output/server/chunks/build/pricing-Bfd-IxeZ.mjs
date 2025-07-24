import { getCurrentInstance, h, computed, ref, watch, onBeforeMount, onMounted, onActivated, onDeactivated, onBeforeUnmount, nextTick, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { t as createComponent, y as hSlot, A as hUniqueSlot, g as __nuxt_component_1$1, v as useDarkProps, w as useDark, B as scrollTargetProp, C as getScrollTarget, D as listenOpts, d as __nuxt_component_3$2, E as hMergeSlot, F as vmHasRouter, H as History, G as isNumber, I as isDate, J as isObject, K as injectMultipleProps, L as injectProp, c as __nuxt_component_3$1, i as __nuxt_component_5$2, u as usePageSeo, s as useRoute, l as useRuntimeConfig, k as useHead, a as __nuxt_component_1, b as __nuxt_component_2 } from './server.mjs';
import { _ as __nuxt_component_0 } from '../_/QPage.mjs';
import { u as useVirtualScrollProps, a as useVirtualScroll, c as commonVirtScrollPropsList, _ as __nuxt_component_8 } from '../_/QSelect.mjs';
import { _ as __nuxt_component_8$2 } from '../_/QLinearProgress.mjs';
import { _ as __nuxt_component_9 } from '../_/QCheckbox.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';
import 'consola';
import '@supabase/supabase-js';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import '../_/QChip.mjs';
import '../_/use-checkbox.mjs';

const QTh = createComponent({
  name: 'QTh',

  props: {
    props: Object,
    autoWidth: Boolean
  },

  emits: [ 'click' ],

  setup (props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;

    const onClick = evt => { emit('click', evt); };

    return () => {
      if (props.props === void 0) {
        return h('th', {
          class: props.autoWidth === true ? 'q-table--col-auto-width' : '',
          onClick
        }, hSlot(slots.default))
      }

      let col, child;
      const name = vm.vnode.key;

      if (name) {
        col = props.props.colsMap[ name ];
        if (col === void 0) return
      }
      else {
        col = props.props.col;
      }

      if (col.sortable === true) {
        const action = col.align === 'right'
          ? 'unshift'
          : 'push';

        child = hUniqueSlot(slots.default, []);
        child[ action ](
          h(__nuxt_component_1$1, {
            class: col.__iconClass,
            name: $q.iconSet.table.arrowUp
          })
        );
      }
      else {
        child = hSlot(slots.default);
      }

      const data = {
        class: col.__thClass
          + (props.autoWidth === true ? ' q-table--col-auto-width' : ''),
        style: col.headerStyle,
        onClick: evt => {
          col.sortable === true && props.props.sort(col);
          onClick(evt);
        }
      };

      return h('th', data, child)
    }
  }
});

const separatorValues = [ 'horizontal', 'vertical', 'cell', 'none' ];

const QMarkupTable = createComponent({
  name: 'QMarkupTable',

  props: {
    ...useDarkProps,

    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,

    separator: {
      type: String,
      default: 'horizontal',
      validator: v => separatorValues.includes(v)
    }
  },

  setup (props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);

    const classes = computed(() =>
      'q-markup-table q-table__container q-table__card'
      + ` q-table--${ props.separator }-separator`
      + (isDark.value === true ? ' q-table--dark q-table__card--dark q-dark' : '')
      + (props.dense === true ? ' q-table--dense' : '')
      + (props.flat === true ? ' q-table--flat' : '')
      + (props.bordered === true ? ' q-table--bordered' : '')
      + (props.square === true ? ' q-table--square' : '')
      + (props.wrapCells === false ? ' q-table--no-wrap' : '')
    );

    return () => h('div', {
      class: classes.value
    }, [
      h('table', { class: 'q-table' }, hSlot(slots.default))
    ])
  }
});

function getTableMiddle (props, content) {
  return h('div', props, [
    h('table', { class: 'q-table' }, content)
  ])
}

const comps = {
  list: __nuxt_component_3$2,
  table: QMarkupTable
};

const typeOptions = [ 'list', 'table', '__qtable' ];

const QVirtualScroll = createComponent({
  name: 'QVirtualScroll',

  props: {
    ...useVirtualScrollProps,

    type: {
      type: String,
      default: 'list',
      validator: v => typeOptions.includes(v)
    },

    items: {
      type: Array,
      default: () => []
    },

    itemsFn: Function,
    itemsSize: Number,

    scrollTarget: scrollTargetProp
  },

  setup (props, { slots, attrs }) {
    let localScrollTarget;
    const rootRef = ref(null);

    const virtualScrollLength = computed(() => (
      props.itemsSize >= 0 && props.itemsFn !== void 0
        ? parseInt(props.itemsSize, 10)
        : (Array.isArray(props.items) ? props.items.length : 0)
    ));

    const {
      virtualScrollSliceRange,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt
    } = useVirtualScroll({
      virtualScrollLength, getVirtualScrollTarget, getVirtualScrollEl
    });

    const virtualScrollScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return []
      }

      const mapFn = (item, i) => ({
        index: virtualScrollSliceRange.value.from + i,
        item
      });

      return props.itemsFn === void 0
        ? props.items.slice(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to).map(mapFn)
        : props.itemsFn(virtualScrollSliceRange.value.from, virtualScrollSliceRange.value.to - virtualScrollSliceRange.value.from).map(mapFn)
    });

    const classes = computed(() =>
      'q-virtual-scroll q-virtual-scroll' + (props.virtualScrollHorizontal === true ? '--horizontal' : '--vertical')
      + (props.scrollTarget !== void 0 ? '' : ' scroll')
    );

    const attributes = computed(() => (
      props.scrollTarget !== void 0 ? {} : { tabindex: 0 }
    ));

    watch(virtualScrollLength, () => {
      localResetVirtualScroll();
    });

    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });

    function getVirtualScrollEl () {
      return rootRef.value.$el || rootRef.value
    }

    function getVirtualScrollTarget () {
      return localScrollTarget
    }

    function configureScrollTarget () {
      localScrollTarget = getScrollTarget(getVirtualScrollEl(), props.scrollTarget);
      localScrollTarget.addEventListener('scroll', onVirtualScrollEvt, listenOpts.passive);
    }

    function unconfigureScrollTarget () {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener('scroll', onVirtualScrollEvt, listenOpts.passive);
        localScrollTarget = void 0;
      }
    }

    function __getVirtualChildren () {
      let child = padVirtualScroll(
        props.type === 'list' ? 'div' : 'tbody',
        virtualScrollScope.value.map(slots.default)
      );

      if (slots.before !== void 0) {
        child = slots.before().concat(child);
      }

      return hMergeSlot(slots.after, child)
    }

    onBeforeMount(() => {
      localResetVirtualScroll();
    });

    onMounted(() => {
      configureScrollTarget();
    });

    onActivated(() => {
      configureScrollTarget();
    });

    onDeactivated(() => {
      unconfigureScrollTarget();
    });

    onBeforeUnmount(() => {
      unconfigureScrollTarget();
    });

    return () => {
      if (slots.default === void 0) {
        console.error('QVirtualScroll: default scoped slot is required for rendering');
        return
      }

      return props.type === '__qtable'
        ? getTableMiddle(
          { ref: rootRef, class: 'q-table__middle ' + classes.value },
          __getVirtualChildren()
        )
        : h(comps[ props.type ], {
          ...attrs,
          ref: rootRef,
          class: [ attrs.class, classes.value ],
          ...attributes.value
        }, __getVirtualChildren)
    }
  }
});

let counter = 0;

const useFullscreenProps = {
  fullscreen: Boolean,
  noRouteFullscreenExit: Boolean
};

const useFullscreenEmits = [ 'update:fullscreen', 'fullscreen' ];

function useFullscreen () {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;

  let historyEntry, fullscreenFillerNode, container;
  const inFullscreen = ref(false);

  vmHasRouter(vm) === true && watch(() => proxy.$route.fullPath, () => {
    props.noRouteFullscreenExit !== true && exitFullscreen();
  });

  watch(() => props.fullscreen, v => {
    if (inFullscreen.value !== v) {
      toggleFullscreen();
    }
  });

  watch(inFullscreen, v => {
    emit('update:fullscreen', v);
    emit('fullscreen', v);
  });

  function toggleFullscreen () {
    if (inFullscreen.value === true) {
      exitFullscreen();
    }
    else {
      setFullscreen();
    }
  }

  function setFullscreen () {
    if (inFullscreen.value === true) return

    inFullscreen.value = true;
    container = proxy.$el.parentNode;
    container.replaceChild(fullscreenFillerNode, proxy.$el);
    document.body.appendChild(proxy.$el);

    counter++;
    if (counter === 1) {
      document.body.classList.add('q-body--fullscreen-mixin');
    }

    historyEntry = {
      handler: exitFullscreen
    };
    History.add(historyEntry);
  }

  function exitFullscreen () {
    if (inFullscreen.value !== true) return

    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }

    container.replaceChild(proxy.$el, fullscreenFillerNode);
    inFullscreen.value = false;

    counter = Math.max(0, counter - 1);

    if (counter === 0) {
      document.body.classList.remove('q-body--fullscreen-mixin');

      if (proxy.$el.scrollIntoView !== void 0) {
        setTimeout(() => { proxy.$el.scrollIntoView(); });
      }
    }
  }

  onBeforeMount(() => {
    fullscreenFillerNode = document.createElement('span');
  });

  onMounted(() => {
    props.fullscreen === true && setFullscreen();
  });

  onBeforeUnmount(exitFullscreen);

  // expose public methods
  Object.assign(proxy, {
    toggleFullscreen,
    setFullscreen,
    exitFullscreen
  });

  return {
    inFullscreen,
    toggleFullscreen
  }
}

function sortDate (a, b) {
  return (new Date(a)) - (new Date(b))
}

const useTableSortProps = {
  sortMethod: Function,
  binaryStateSort: Boolean,
  columnSortOrder: {
    type: String,
    validator: v => v === 'ad' || v === 'da',
    default: 'ad'
  }
};

function useTableSort (props, computedPagination, colList, setPagination) {
  const columnToSort = computed(() => {
    const { sortBy } = computedPagination.value;

    return sortBy
      ? colList.value.find(def => def.name === sortBy) || null
      : null
  });

  const computedSortMethod = computed(() => (
    props.sortMethod !== void 0
      ? props.sortMethod
      : (data, sortBy, descending) => {
          const col = colList.value.find(def => def.name === sortBy);
          if (col === void 0 || col.field === void 0) {
            return data
          }

          const
            dir = descending === true ? -1 : 1,
            val = typeof col.field === 'function'
              ? v => col.field(v)
              : v => v[ col.field ];

          return data.sort((a, b) => {
            let
              A = val(a),
              B = val(b);

            if (col.rawSort !== void 0) {
              return col.rawSort(A, B, a, b) * dir
            }
            if (A === null || A === void 0) {
              return -1 * dir
            }
            if (B === null || B === void 0) {
              return 1 * dir
            }
            if (col.sort !== void 0) {
              // gets called without rows that have null/undefined as value
              // due to the above two statements
              return col.sort(A, B, a, b) * dir
            }
            if (isNumber(A) === true && isNumber(B) === true) {
              return (A - B) * dir
            }
            if (isDate(A) === true && isDate(B) === true) {
              return sortDate(A, B) * dir
            }
            if (typeof A === 'boolean' && typeof B === 'boolean') {
              return (A - B) * dir
            }

            [ A, B ] = [ A, B ].map(s => (s + '').toLocaleString().toLowerCase());

            return A < B
              ? -1 * dir
              : (A === B ? 0 : dir)
          })
        }
  ));

  function sort (col /* String(col name) or Object(col definition) */) {
    let sortOrder = props.columnSortOrder;

    if (isObject(col) === true) {
      if (col.sortOrder) {
        sortOrder = col.sortOrder;
      }

      col = col.name;
    }
    else {
      const def = colList.value.find(def => def.name === col);
      if (def?.sortOrder) {
        sortOrder = def.sortOrder;
      }
    }

    let { sortBy, descending } = computedPagination.value;

    if (sortBy !== col) {
      sortBy = col;
      descending = sortOrder === 'da';
    }
    else if (props.binaryStateSort === true) {
      descending = !descending;
    }
    else if (descending === true) {
      if (sortOrder === 'ad') {
        sortBy = null;
      }
      else {
        descending = false;
      }
    }
    else { // ascending
      if (sortOrder === 'ad') {
        descending = true;
      }
      else {
        sortBy = null;
      }
    }

    setPagination({ sortBy, descending, page: 1 });
  }

  return {
    columnToSort,
    computedSortMethod,
    sort
  }
}

const useTableFilterProps = {
  filter: [ String, Object ],
  filterMethod: Function
};

function useTableFilter (props, setPagination) {
  const computedFilterMethod = computed(() => (
    props.filterMethod !== void 0
      ? props.filterMethod
      : (rows, terms, cols, cellValue) => {
          const lowerTerms = terms ? terms.toLowerCase() : '';
          return rows.filter(
            row => cols.some(col => {
              const val = cellValue(col, row) + '';
              const haystack = (val === 'undefined' || val === 'null') ? '' : val.toLowerCase();
              return haystack.indexOf(lowerTerms) !== -1
            })
          )
        }
  ));

  watch(
    () => props.filter,
    () => {
      nextTick(() => {
        setPagination({ page: 1 }, true);
      });
    },
    { deep: true }
  );

  return { computedFilterMethod }
}

function samePagination (oldPag, newPag) {
  for (const prop in newPag) {
    if (newPag[ prop ] !== oldPag[ prop ]) {
      return false
    }
  }
  return true
}

function fixPagination (p) {
  if (p.page < 1) {
    p.page = 1;
  }
  if (p.rowsPerPage !== void 0 && p.rowsPerPage < 1) {
    p.rowsPerPage = 0;
  }
  return p
}

const useTablePaginationProps = {
  pagination: Object,
  rowsPerPageOptions: {
    type: Array,
    default: () => [ 5, 7, 10, 15, 20, 25, 50, 0 ]
  },

  'onUpdate:pagination': [ Function, Array ]
};

function useTablePaginationState (vm, getCellValue) {
  const { props, emit } = vm;

  const innerPagination = ref(
    Object.assign({
      sortBy: null,
      descending: false,
      page: 1,
      rowsPerPage: props.rowsPerPageOptions.length !== 0
        ? props.rowsPerPageOptions[ 0 ]
        : 5
    }, props.pagination)
  );

  const computedPagination = computed(() => {
    const pag = props[ 'onUpdate:pagination' ] !== void 0
      ? { ...innerPagination.value, ...props.pagination }
      : innerPagination.value;

    return fixPagination(pag)
  });

  const isServerSide = computed(() => computedPagination.value.rowsNumber !== void 0);

  function sendServerRequest (pagination) {
    requestServerInteraction({
      pagination,
      filter: props.filter
    });
  }

  function requestServerInteraction (prop = {}) {
    nextTick(() => {
      emit('request', {
        pagination: prop.pagination || computedPagination.value,
        filter: prop.filter || props.filter,
        getCellValue
      });
    });
  }

  function setPagination (val, forceServerRequest) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    });

    if (samePagination(computedPagination.value, newPagination) === true) {
      if (isServerSide.value === true && forceServerRequest === true) {
        sendServerRequest(newPagination);
      }
      return
    }

    if (isServerSide.value === true) {
      sendServerRequest(newPagination);
      return
    }

    if (
      props.pagination !== void 0
      && props[ 'onUpdate:pagination' ] !== void 0
    ) {
      emit('update:pagination', newPagination);
    }
    else {
      innerPagination.value = newPagination;
    }
  }

  return {
    innerPagination,
    computedPagination,
    isServerSide,

    requestServerInteraction,
    setPagination
  }
}

function useTablePagination (vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber) {
  const { props, emit, proxy: { $q } } = vm;

  const computedRowsNumber = computed(() => (
    isServerSide.value === true
      ? computedPagination.value.rowsNumber || 0
      : filteredSortedRowsNumber.value
  ));

  const firstRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return (page - 1) * rowsPerPage
  });

  const lastRowIndex = computed(() => {
    const { page, rowsPerPage } = computedPagination.value;
    return page * rowsPerPage
  });

  const isFirstPage = computed(() => computedPagination.value.page === 1);

  const pagesNumber = computed(() => (
    computedPagination.value.rowsPerPage === 0
      ? 1
      : Math.max(
        1,
        Math.ceil(computedRowsNumber.value / computedPagination.value.rowsPerPage)
      )
  ));

  const isLastPage = computed(() => (
    lastRowIndex.value === 0
      ? true
      : computedPagination.value.page >= pagesNumber.value
  ));

  const computedRowsPerPageOptions = computed(() => {
    const opts = props.rowsPerPageOptions.includes(innerPagination.value.rowsPerPage)
      ? props.rowsPerPageOptions
      : [ innerPagination.value.rowsPerPage ].concat(props.rowsPerPageOptions);

    return opts.map(count => ({
      label: count === 0 ? $q.lang.table.allRows : '' + count,
      value: count
    }))
  });

  watch(pagesNumber, (lastPage, oldLastPage) => {
    if (lastPage === oldLastPage) return

    const currentPage = computedPagination.value.page;
    if (lastPage && !currentPage) {
      setPagination({ page: 1 });
    }
    else if (lastPage < currentPage) {
      setPagination({ page: lastPage });
    }
  });

  function firstPage () {
    setPagination({ page: 1 });
  }

  function prevPage () {
    const { page } = computedPagination.value;
    if (page > 1) {
      setPagination({ page: page - 1 });
    }
  }

  function nextPage () {
    const { page, rowsPerPage } = computedPagination.value;
    if (lastRowIndex.value > 0 && page * rowsPerPage < computedRowsNumber.value) {
      setPagination({ page: page + 1 });
    }
  }

  function lastPage () {
    setPagination({ page: pagesNumber.value });
  }

  if (props[ 'onUpdate:pagination' ] !== void 0) {
    emit('update:pagination', { ...computedPagination.value });
  }

  return {
    firstRowIndex,
    lastRowIndex,
    isFirstPage,
    isLastPage,
    pagesNumber,
    computedRowsPerPageOptions,
    computedRowsNumber,

    firstPage,
    prevPage,
    nextPage,
    lastPage
  }
}

const useTableRowSelectionProps = {
  selection: {
    type: String,
    default: 'none',
    validator: v => [ 'single', 'multiple', 'none' ].includes(v)
  },
  selected: {
    type: Array,
    default: () => []
  }
};

const useTableRowSelectionEmits = [ 'update:selected', 'selection' ];

function useTableRowSelection (props, emit, computedRows, getRowKey) {
  const selectedKeys = computed(() => {
    const keys = {};
    props.selected.map(getRowKey.value).forEach(key => {
      keys[ key ] = true;
    });
    return keys
  });

  const hasSelectionMode = computed(() => {
    return props.selection !== 'none'
  });

  const singleSelection = computed(() => {
    return props.selection === 'single'
  });

  const multipleSelection = computed(() => {
    return props.selection === 'multiple'
  });

  const allRowsSelected = computed(() =>
    computedRows.value.length !== 0 && computedRows.value.every(
      row => selectedKeys.value[ getRowKey.value(row) ] === true
    )
  );

  const someRowsSelected = computed(() =>
    allRowsSelected.value !== true
    && computedRows.value.some(row => selectedKeys.value[ getRowKey.value(row) ] === true)
  );

  const rowsSelectedNumber = computed(() => props.selected.length);

  function isRowSelected (key) {
    return selectedKeys.value[ key ] === true
  }

  function clearSelection () {
    emit('update:selected', []);
  }

  function updateSelection (keys, rows, added, evt) {
    emit('selection', { rows, added, keys, evt });

    const payload = singleSelection.value === true
      ? (added === true ? rows : [])
      : (
          added === true
            ? props.selected.concat(rows)
            : props.selected.filter(
              row => keys.includes(getRowKey.value(row)) === false
            )
        );

    emit('update:selected', payload);
  }

  return {
    hasSelectionMode,
    singleSelection,
    multipleSelection,
    allRowsSelected,
    someRowsSelected,
    rowsSelectedNumber,

    isRowSelected,
    clearSelection,
    updateSelection
  }
}

function getVal (val) {
  return Array.isArray(val)
    ? val.slice()
    : []
}

const useTableRowExpandProps = {
  expanded: Array // v-model:expanded
};

const useTableRowExpandEmits = [ 'update:expanded' ];

function useTableRowExpand (props, emit) {
  const innerExpanded = ref(getVal(props.expanded));

  watch(() => props.expanded, val => {
    innerExpanded.value = getVal(val);
  });

  function isRowExpanded (key) {
    return innerExpanded.value.includes(key)
  }

  function setExpanded (val) {
    if (props.expanded !== void 0) {
      emit('update:expanded', val);
    }
    else {
      innerExpanded.value = val;
    }
  }

  function updateExpanded (key, add) {
    const target = innerExpanded.value.slice();
    const index = target.indexOf(key);

    if (add === true) {
      if (index === -1) {
        target.push(key);
        setExpanded(target);
      }
    }
    else if (index !== -1) {
      target.splice(index, 1);
      setExpanded(target);
    }
  }

  return {
    isRowExpanded,
    setExpanded,
    updateExpanded
  }
}

const useTableColumnSelectionProps = {
  visibleColumns: Array
};

function useTableColumnSelection (props, computedPagination, hasSelectionMode) {
  const colList = computed(() => {
    if (props.columns !== void 0) {
      return props.columns
    }

    // we infer columns from first row
    const row = props.rows[ 0 ];

    return row !== void 0
      ? Object.keys(row).map(name => ({
        name,
        label: name.toUpperCase(),
        field: name,
        align: isNumber(row[ name ]) ? 'right' : 'left',
        sortable: true
      }))
      : []
  });

  const computedCols = computed(() => {
    const { sortBy, descending } = computedPagination.value;

    const cols = props.visibleColumns !== void 0
      ? colList.value.filter(col => col.required === true || props.visibleColumns.includes(col.name) === true)
      : colList.value;

    return cols.map(col => {
      const align = col.align || 'right';
      const alignClass = `text-${ align }`;

      return {
        ...col,
        align,
        __iconClass: `q-table__sort-icon q-table__sort-icon--${ align }`,
        __thClass: alignClass
          + (col.headerClasses !== void 0 ? ' ' + col.headerClasses : '')
          + (col.sortable === true ? ' sortable' : '')
          + (col.name === sortBy ? ` sorted ${ descending === true ? 'sort-desc' : '' }` : ''),

        __tdStyle: col.style !== void 0
          ? (
              typeof col.style !== 'function'
                ? () => col.style
                : col.style
            )
          : () => null,

        __tdClass: col.classes !== void 0
          ? (
              typeof col.classes !== 'function'
                ? () => alignClass + ' ' + col.classes
                : row => alignClass + ' ' + col.classes(row)
            )
          : () => alignClass
      }
    })
  });

  const computedColsMap = computed(() => {
    const names = {};
    computedCols.value.forEach(col => {
      names[ col.name ] = col;
    });
    return names
  });

  const computedColspan = computed(() => {
    return props.tableColspan !== void 0
      ? props.tableColspan
      : computedCols.value.length + (hasSelectionMode.value === true ? 1 : 0)
  });

  return {
    colList,
    computedCols,
    computedColsMap,
    computedColspan
  }
}

const bottomClass = 'q-table__bottom row items-center';

const virtScrollPassthroughProps = {};
commonVirtScrollPropsList.forEach(p => { virtScrollPassthroughProps[ p ] = {}; });

const __nuxt_component_3 = createComponent({
  name: 'QTable',

  props: {
    rows: {
      type: Array,
      required: true
    },
    rowKey: {
      type: [ String, Function ],
      default: 'id'
    },

    columns: Array,
    loading: Boolean,

    iconFirstPage: String,
    iconPrevPage: String,
    iconNextPage: String,
    iconLastPage: String,

    title: String,

    hideHeader: Boolean,

    grid: Boolean,
    gridHeader: Boolean,

    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    separator: {
      type: String,
      default: 'horizontal',
      validator: v => [ 'horizontal', 'vertical', 'cell', 'none' ].includes(v)
    },
    wrapCells: Boolean,

    virtualScroll: Boolean,
    virtualScrollTarget: {},
    ...virtScrollPassthroughProps,

    noDataLabel: String,
    noResultsLabel: String,
    loadingLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,

    color: {
      type: String,
      default: 'grey-8'
    },

    titleClass: [ String, Array, Object ],
    tableStyle: [ String, Array, Object ],
    tableClass: [ String, Array, Object ],
    tableHeaderStyle: [ String, Array, Object ],
    tableHeaderClass: [ String, Array, Object ],
    tableRowStyleFn: Function,
    tableRowClassFn: Function,
    cardContainerClass: [ String, Array, Object ],
    cardContainerStyle: [ String, Array, Object ],
    cardStyle: [ String, Array, Object ],
    cardClass: [ String, Array, Object ],
    cardStyleFn: Function,
    cardClassFn: Function,

    hideBottom: Boolean,
    hideSelectedBanner: Boolean,
    hideNoData: Boolean,
    hidePagination: Boolean,

    onRowClick: Function,
    onRowDblclick: Function,
    onRowContextmenu: Function,

    ...useDarkProps,
    ...useFullscreenProps,

    ...useTableColumnSelectionProps,
    ...useTableFilterProps,
    ...useTablePaginationProps,
    ...useTableRowExpandProps,
    ...useTableRowSelectionProps,
    ...useTableSortProps
  },

  emits: [
    'request', 'virtualScroll',
    ...useFullscreenEmits,
    ...useTableRowExpandEmits,
    ...useTableRowSelectionEmits
  ],

  setup (props, { slots, emit }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;

    const isDark = useDark(props, $q);
    const { inFullscreen, toggleFullscreen } = useFullscreen();

    const getRowKey = computed(() => (
      typeof props.rowKey === 'function'
        ? props.rowKey
        : row => row[ props.rowKey ]
    ));

    const rootRef = ref(null);
    const virtScrollRef = ref(null);
    const hasVirtScroll = computed(() => props.grid !== true && props.virtualScroll === true);

    const cardDefaultClass = computed(() =>
      ' q-table__card'
      + (isDark.value === true ? ' q-table__card--dark q-dark' : '')
      + (props.square === true ? ' q-table--square' : '')
      + (props.flat === true ? ' q-table--flat' : '')
      + (props.bordered === true ? ' q-table--bordered' : '')
    );

    const containerClass = computed(() =>
      `q-table__container q-table--${ props.separator }-separator column no-wrap`
      + (props.grid === true ? ' q-table--grid' : cardDefaultClass.value)
      + (isDark.value === true ? ' q-table--dark' : '')
      + (props.dense === true ? ' q-table--dense' : '')
      + (props.wrapCells === false ? ' q-table--no-wrap' : '')
      + (inFullscreen.value === true ? ' fullscreen scroll' : '')
    );

    const rootContainerClass = computed(() =>
      containerClass.value + (props.loading === true ? ' q-table--loading' : '')
    );

    watch(
      () => props.tableStyle + props.tableClass + props.tableHeaderStyle + props.tableHeaderClass + containerClass.value,
      () => { hasVirtScroll.value === true && virtScrollRef.value?.reset(); }
    );

    const {
      innerPagination,
      computedPagination,
      isServerSide,

      requestServerInteraction,
      setPagination
    } = useTablePaginationState(vm, getCellValue);

    const { computedFilterMethod } = useTableFilter(props, setPagination);
    const { isRowExpanded, setExpanded, updateExpanded } = useTableRowExpand(props, emit);

    const filteredSortedRows = computed(() => {
      let rows = props.rows;

      if (isServerSide.value === true || rows.length === 0) {
        return rows
      }

      const { sortBy, descending } = computedPagination.value;

      if (props.filter) {
        rows = computedFilterMethod.value(rows, props.filter, computedCols.value, getCellValue);
      }

      if (columnToSort.value !== null) {
        rows = computedSortMethod.value(
          props.rows === rows ? rows.slice() : rows,
          sortBy,
          descending
        );
      }

      return rows
    });

    const filteredSortedRowsNumber = computed(() => filteredSortedRows.value.length);

    const computedRows = computed(() => {
      let rows = filteredSortedRows.value;

      if (isServerSide.value === true) {
        return rows
      }

      const { rowsPerPage } = computedPagination.value;

      if (rowsPerPage !== 0) {
        if (firstRowIndex.value === 0 && props.rows !== rows) {
          if (rows.length > lastRowIndex.value) {
            rows = rows.slice(0, lastRowIndex.value);
          }
        }
        else {
          rows = rows.slice(firstRowIndex.value, lastRowIndex.value);
        }
      }

      return rows
    });

    const {
      hasSelectionMode,
      singleSelection,
      multipleSelection,
      allRowsSelected,
      someRowsSelected,
      rowsSelectedNumber,

      isRowSelected,
      clearSelection,
      updateSelection
    } = useTableRowSelection(props, emit, computedRows, getRowKey);

    const { colList, computedCols, computedColsMap, computedColspan } = useTableColumnSelection(props, computedPagination, hasSelectionMode);

    const { columnToSort, computedSortMethod, sort } = useTableSort(props, computedPagination, colList, setPagination);

    const {
      firstRowIndex,
      lastRowIndex,
      isFirstPage,
      isLastPage,
      pagesNumber,
      computedRowsPerPageOptions,
      computedRowsNumber,

      firstPage,
      prevPage,
      nextPage,
      lastPage
    } = useTablePagination(vm, innerPagination, computedPagination, isServerSide, setPagination, filteredSortedRowsNumber);

    const nothingToDisplay = computed(() => computedRows.value.length === 0);

    const virtProps = computed(() => {
      const acc = {};

      commonVirtScrollPropsList
        .forEach(p => { acc[ p ] = props[ p ]; });

      if (acc.virtualScrollItemSize === void 0) {
        acc.virtualScrollItemSize = props.dense === true ? 28 : 48;
      }

      return acc
    });

    function resetVirtualScroll () {
      hasVirtScroll.value === true && virtScrollRef.value.reset();
    }

    function getBody () {
      if (props.grid === true) {
        return getGridBody()
      }

      const header = props.hideHeader !== true ? getTHead : null;

      if (hasVirtScroll.value === true) {
        const topRow = slots[ 'top-row' ];
        const bottomRow = slots[ 'bottom-row' ];

        const virtSlots = {
          default: props => getTBodyTR(props.item, slots.body, props.index)
        };

        if (topRow !== void 0) {
          const topContent = h('tbody', topRow({ cols: computedCols.value }));

          virtSlots.before = header === null
            ? () => topContent
            : () => [ header() ].concat(topContent);
        }
        else if (header !== null) {
          virtSlots.before = header;
        }

        if (bottomRow !== void 0) {
          virtSlots.after = () => h('tbody', bottomRow({ cols: computedCols.value }));
        }

        return h(QVirtualScroll, {
          ref: virtScrollRef,
          class: props.tableClass,
          style: props.tableStyle,
          ...virtProps.value,
          scrollTarget: props.virtualScrollTarget,
          items: computedRows.value,
          type: '__qtable',
          tableColspan: computedColspan.value,
          onVirtualScroll: onVScroll
        }, virtSlots)
      }

      const child = [
        getTBody()
      ];

      if (header !== null) {
        child.unshift(header());
      }

      return getTableMiddle({
        class: [ 'q-table__middle scroll', props.tableClass ],
        style: props.tableStyle
      }, child)
    }

    function scrollTo (toIndex, edge) {
      if (virtScrollRef.value !== null) {
        virtScrollRef.value.scrollTo(toIndex, edge);
        return
      }

      toIndex = parseInt(toIndex, 10);
      const rowEl = rootRef.value.querySelector(`tbody tr:nth-of-type(${ toIndex + 1 })`);

      if (rowEl !== null) {
        const scrollTarget = rootRef.value.querySelector('.q-table__middle.scroll');
        const offsetTop = rowEl.offsetTop - props.virtualScrollStickySizeStart;
        const direction = offsetTop < scrollTarget.scrollTop ? 'decrease' : 'increase';

        scrollTarget.scrollTop = offsetTop;

        emit('virtualScroll', {
          index: toIndex,
          from: 0,
          to: innerPagination.value.rowsPerPage - 1,
          direction
        });
      }
    }

    function onVScroll (info) {
      emit('virtualScroll', info);
    }

    function getProgress () {
      return [
        h(__nuxt_component_8$2, {
          class: 'q-table__linear-progress',
          color: props.color,
          dark: isDark.value,
          indeterminate: true,
          trackColor: 'transparent'
        })
      ]
    }

    function getTBodyTR (row, bodySlot, pageIndex) {
      const
        key = getRowKey.value(row),
        selected = isRowSelected(key);

      if (bodySlot !== void 0) {
        const cfg = {
          key,
          row,
          pageIndex,
          __trClass: selected ? 'selected' : ''
        };

        if (props.tableRowStyleFn !== void 0) {
          cfg.__trStyle = props.tableRowStyleFn(row);
        }

        if (props.tableRowClassFn !== void 0) {
          const cls = props.tableRowClassFn(row);
          if (cls) {
            cfg.__trClass = `${ cls } ${ cfg.__trClass }`;
          }
        }

        return bodySlot(
          getBodyScope(cfg)
        )
      }

      const
        bodyCell = slots[ 'body-cell' ],
        child = computedCols.value.map(col => {
          const
            bodyCellCol = slots[ `body-cell-${ col.name }` ],
            slot = bodyCellCol !== void 0 ? bodyCellCol : bodyCell;

          return slot !== void 0
            ? slot(getBodyCellScope({ key, row, pageIndex, col }))
            : h('td', {
              class: col.__tdClass(row),
              style: col.__tdStyle(row)
            }, getCellValue(col, row))
        });

      if (hasSelectionMode.value === true) {
        const slot = slots[ 'body-selection' ];
        const content = slot !== void 0
          ? slot(getBodySelectionScope({ key, row, pageIndex }))
          : [
              h(__nuxt_component_9, {
                modelValue: selected,
                color: props.color,
                dark: isDark.value,
                dense: props.dense,
                'onUpdate:modelValue': (adding, evt) => {
                  updateSelection([ key ], [ row ], adding, evt);
                }
              })
            ];

        child.unshift(
          h('td', { class: 'q-table--col-auto-width' }, content)
        );
      }

      const data = { key, class: { selected } };

      if (props.onRowClick !== void 0) {
        data.class[ 'cursor-pointer' ] = true;
        data.onClick = evt => {
          emit('rowClick', evt, row, pageIndex);
        };
      }

      if (props.onRowDblclick !== void 0) {
        data.class[ 'cursor-pointer' ] = true;
        data.onDblclick = evt => {
          emit('rowDblclick', evt, row, pageIndex);
        };
      }

      if (props.onRowContextmenu !== void 0) {
        data.class[ 'cursor-pointer' ] = true;
        data.onContextmenu = evt => {
          emit('rowContextmenu', evt, row, pageIndex);
        };
      }

      if (props.tableRowStyleFn !== void 0) {
        data.style = props.tableRowStyleFn(row);
      }

      if (props.tableRowClassFn !== void 0) {
        const cls = props.tableRowClassFn(row);
        if (cls) {
          data.class[ cls ] = true;
        }
      }

      return h('tr', data, child)
    }

    function getTBody () {
      const
        body = slots.body,
        topRow = slots[ 'top-row' ],
        bottomRow = slots[ 'bottom-row' ];

      let child = computedRows.value.map(
        (row, pageIndex) => getTBodyTR(row, body, pageIndex)
      );

      if (topRow !== void 0) {
        child = topRow({ cols: computedCols.value }).concat(child);
      }
      if (bottomRow !== void 0) {
        child = child.concat(bottomRow({ cols: computedCols.value }));
      }

      return h('tbody', child)
    }

    function getBodyScope (data) {
      injectBodyCommonScope(data);

      data.cols = data.cols.map(
        col => injectProp({ ...col }, 'value', () => getCellValue(col, data.row))
      );

      return data
    }

    function getBodyCellScope (data) {
      injectBodyCommonScope(data);
      injectProp(data, 'value', () => getCellValue(data.col, data.row));
      return data
    }

    function getBodySelectionScope (data) {
      injectBodyCommonScope(data);
      return data
    }

    function injectBodyCommonScope (data) {
      Object.assign(data, {
        cols: computedCols.value,
        colsMap: computedColsMap.value,
        sort,
        rowIndex: firstRowIndex.value + data.pageIndex,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });

      hasSelectionMode.value === true && injectProp(
        data,
        'selected',
        () => isRowSelected(data.key),
        (adding, evt) => {
          updateSelection([ data.key ], [ data.row ], adding, evt);
        }
      );

      injectProp(
        data,
        'expand',
        () => isRowExpanded(data.key),
        adding => { updateExpanded(data.key, adding); }
      );
    }

    function getCellValue (col, row) {
      const val = typeof col.field === 'function' ? col.field(row) : row[ col.field ];
      return col.format !== void 0 ? col.format(val, row) : val
    }

    const marginalsScope = computed(() => ({
      pagination: computedPagination.value,
      pagesNumber: pagesNumber.value,
      isFirstPage: isFirstPage.value,
      isLastPage: isLastPage.value,
      firstPage,
      prevPage,
      nextPage,
      lastPage,

      inFullscreen: inFullscreen.value,
      toggleFullscreen
    }));

    function getTopDiv () {
      const
        top = slots.top,
        topLeft = slots[ 'top-left' ],
        topRight = slots[ 'top-right' ],
        topSelection = slots[ 'top-selection' ],
        hasSelection = hasSelectionMode.value === true
          && topSelection !== void 0
          && rowsSelectedNumber.value > 0,
        topClass = 'q-table__top relative-position row items-center';

      if (top !== void 0) {
        return h('div', { class: topClass }, [ top(marginalsScope.value) ])
      }

      let child;

      if (hasSelection === true) {
        child = topSelection(marginalsScope.value).slice();
      }
      else {
        child = [];

        if (topLeft !== void 0) {
          child.push(
            h('div', { class: 'q-table__control' }, [
              topLeft(marginalsScope.value)
            ])
          );
        }
        else if (props.title) {
          child.push(
            h('div', { class: 'q-table__control' }, [
              h('div', {
                class: [ 'q-table__title', props.titleClass ]
              }, props.title)
            ])
          );
        }
      }

      if (topRight !== void 0) {
        child.push(
          h('div', { class: 'q-table__separator col' })
        );
        child.push(
          h('div', { class: 'q-table__control' }, [
            topRight(marginalsScope.value)
          ])
        );
      }

      if (child.length === 0) return
      return h('div', { class: topClass }, child)
    }

    const headerSelectedValue = computed(() => (
      someRowsSelected.value === true
        ? null
        : allRowsSelected.value
    ));

    function getTHead () {
      const child = getTHeadTR();

      if (props.loading === true && slots.loading === void 0) {
        child.push(
          h('tr', { class: 'q-table__progress' }, [
            h('th', {
              class: 'relative-position',
              colspan: computedColspan.value
            }, getProgress())
          ])
        );
      }

      return h('thead', child)
    }

    function getTHeadTR () {
      const
        header = slots.header,
        headerCell = slots[ 'header-cell' ];

      if (header !== void 0) {
        return header(
          getHeaderScope({ header: true })
        ).slice()
      }

      const child = computedCols.value.map(col => {
        const
          headerCellCol = slots[ `header-cell-${ col.name }` ],
          slot = headerCellCol !== void 0 ? headerCellCol : headerCell,
          props = getHeaderScope({ col });

        return slot !== void 0
          ? slot(props)
          : h(QTh, {
            key: col.name,
            props
          }, () => col.label)
      });

      if (singleSelection.value === true && props.grid !== true) {
        child.unshift(
          h('th', { class: 'q-table--col-auto-width' }, ' ')
        );
      }
      else if (multipleSelection.value === true) {
        const slot = slots[ 'header-selection' ];
        const content = slot !== void 0
          ? slot(getHeaderScope({}))
          : [
              h(__nuxt_component_9, {
                color: props.color,
                modelValue: headerSelectedValue.value,
                dark: isDark.value,
                dense: props.dense,
                'onUpdate:modelValue': onMultipleSelectionSet
              })
            ];

        child.unshift(
          h('th', { class: 'q-table--col-auto-width' }, content)
        );
      }

      return [
        h('tr', {
          class: props.tableHeaderClass,
          style: props.tableHeaderStyle
        }, child)
      ]
    }

    function getHeaderScope (data) {
      Object.assign(data, {
        cols: computedCols.value,
        sort,
        colsMap: computedColsMap.value,
        color: props.color,
        dark: isDark.value,
        dense: props.dense
      });

      if (multipleSelection.value === true) {
        injectProp(
          data,
          'selected',
          () => headerSelectedValue.value,
          onMultipleSelectionSet
        );
      }

      return data
    }

    function onMultipleSelectionSet (val) {
      if (someRowsSelected.value === true) {
        val = false;
      }

      updateSelection(
        computedRows.value.map(getRowKey.value),
        computedRows.value,
        val
      );
    }

    const navIcon = computed(() => {
      const ico = [
        props.iconFirstPage || $q.iconSet.table.firstPage,
        props.iconPrevPage || $q.iconSet.table.prevPage,
        props.iconNextPage || $q.iconSet.table.nextPage,
        props.iconLastPage || $q.iconSet.table.lastPage
      ];
      return $q.lang.rtl === true ? ico.reverse() : ico
    });

    function getBottomDiv () {
      if (props.hideBottom === true) return

      if (nothingToDisplay.value === true) {
        if (props.hideNoData === true) return

        const message = props.loading === true
          ? props.loadingLabel || $q.lang.table.loading
          : (props.filter ? props.noResultsLabel || $q.lang.table.noResults : props.noDataLabel || $q.lang.table.noData);

        const noData = slots[ 'no-data' ];
        const children = noData !== void 0
          ? [ noData({ message, icon: $q.iconSet.table.warning, filter: props.filter }) ]
          : [
              h(__nuxt_component_1$1, {
                class: 'q-table__bottom-nodata-icon',
                name: $q.iconSet.table.warning
              }),
              message
            ];

        return h('div', { class: bottomClass + ' q-table__bottom--nodata' }, children)
      }

      const bottom = slots.bottom;

      if (bottom !== void 0) {
        return h('div', { class: bottomClass }, [ bottom(marginalsScope.value) ])
      }

      const child = props.hideSelectedBanner !== true && hasSelectionMode.value === true && rowsSelectedNumber.value > 0
        ? [
            h('div', { class: 'q-table__control' }, [
              h('div', [
                (props.selectedRowsLabel || $q.lang.table.selectedRecords)(rowsSelectedNumber.value)
              ])
            ])
          ]
        : [];

      if (props.hidePagination !== true) {
        return h('div', {
          class: bottomClass + ' justify-end'
        }, getPaginationDiv(child))
      }

      if (child.length !== 0) {
        return h('div', { class: bottomClass }, child)
      }
    }

    function onPagSelection (pag) {
      setPagination({
        page: 1,
        rowsPerPage: pag.value
      });
    }

    function getPaginationDiv (child) {
      let control;
      const
        { rowsPerPage } = computedPagination.value,
        paginationLabel = props.paginationLabel || $q.lang.table.pagination,
        paginationSlot = slots.pagination,
        hasOpts = props.rowsPerPageOptions.length > 1;

      child.push(
        h('div', { class: 'q-table__separator col' })
      );

      hasOpts === true && child.push(
        h('div', { class: 'q-table__control' }, [
          h('span', { class: 'q-table__bottom-item' }, [
            props.rowsPerPageLabel || $q.lang.table.recordsPerPage
          ]),
          h(__nuxt_component_8, {
            class: 'q-table__select inline q-table__bottom-item',
            color: props.color,
            modelValue: rowsPerPage,
            options: computedRowsPerPageOptions.value,
            displayValue: rowsPerPage === 0
              ? $q.lang.table.allRows
              : rowsPerPage,
            dark: isDark.value,
            borderless: true,
            dense: true,
            optionsDense: true,
            optionsCover: true,
            'onUpdate:modelValue': onPagSelection
          })
        ])
      );

      if (paginationSlot !== void 0) {
        control = paginationSlot(marginalsScope.value);
      }
      else {
        control = [
          h('span', rowsPerPage !== 0 ? { class: 'q-table__bottom-item' } : {}, [
            rowsPerPage
              ? paginationLabel(firstRowIndex.value + 1, Math.min(lastRowIndex.value, computedRowsNumber.value), computedRowsNumber.value)
              : paginationLabel(1, filteredSortedRowsNumber.value, computedRowsNumber.value)
          ])
        ];

        if (rowsPerPage !== 0 && pagesNumber.value > 1) {
          const btnProps = {
            color: props.color,
            round: true,
            dense: true,
            flat: true
          };

          if (props.dense === true) {
            btnProps.size = 'sm';
          }

          pagesNumber.value > 2 && control.push(
            h(__nuxt_component_3$1, {
              key: 'pgFirst',
              ...btnProps,
              icon: navIcon.value[ 0 ],
              disable: isFirstPage.value,
              ariaLabel: $q.lang.pagination.first,
              onClick: firstPage
            })
          );

          control.push(
            h(__nuxt_component_3$1, {
              key: 'pgPrev',
              ...btnProps,
              icon: navIcon.value[ 1 ],
              disable: isFirstPage.value,
              ariaLabel: $q.lang.pagination.prev,
              onClick: prevPage
            }),

            h(__nuxt_component_3$1, {
              key: 'pgNext',
              ...btnProps,
              icon: navIcon.value[ 2 ],
              disable: isLastPage.value,
              ariaLabel: $q.lang.pagination.next,
              onClick: nextPage
            })
          );

          pagesNumber.value > 2 && control.push(
            h(__nuxt_component_3$1, {
              key: 'pgLast',
              ...btnProps,
              icon: navIcon.value[ 3 ],
              disable: isLastPage.value,
              ariaLabel: $q.lang.pagination.last,
              onClick: lastPage
            })
          );
        }
      }

      child.push(
        h('div', { class: 'q-table__control' }, control)
      );

      return child
    }

    function getGridHeader () {
      const child = props.gridHeader === true
        ? [
            h('table', { class: 'q-table' }, [
              getTHead()
            ])
          ]
        : (
            props.loading === true && slots.loading === void 0
              ? getProgress()
              : void 0
          );

      return h('div', { class: 'q-table__middle' }, child)
    }

    function getGridBody () {
      const item = slots.item !== void 0
        ? slots.item
        : scope => {
          const child = scope.cols.map(
            col => h('div', { class: 'q-table__grid-item-row' }, [
              h('div', { class: 'q-table__grid-item-title' }, [ col.label ]),
              h('div', { class: 'q-table__grid-item-value' }, [ col.value ])
            ])
          );

          if (hasSelectionMode.value === true) {
            const slot = slots[ 'body-selection' ];
            const content = slot !== void 0
              ? slot(scope)
              : [
                  h(__nuxt_component_9, {
                    modelValue: scope.selected,
                    color: props.color,
                    dark: isDark.value,
                    dense: props.dense,
                    'onUpdate:modelValue': (adding, evt) => {
                      updateSelection([ scope.key ], [ scope.row ], adding, evt);
                    }
                  })
                ];

            child.unshift(
              h('div', { class: 'q-table__grid-item-row' }, content),
              h(__nuxt_component_5$2, { dark: isDark.value })
            );
          }

          const data = {
            class: [
              'q-table__grid-item-card' + cardDefaultClass.value,
              props.cardClass
            ],
            style: props.cardStyle
          };

          if (props.cardStyleFn !== void 0) {
            data.style = [ data.style, props.cardStyleFn(scope.row) ];
          }

          if (props.cardClassFn !== void 0) {
            const cls = props.cardClassFn(scope.row);
            if (cls) {
              data.class[ 0 ] += ` ${ cls }`;
            }
          }

          if (
            props.onRowClick !== void 0
            || props.onRowDblclick !== void 0
            || props.onRowContextmenu !== void 0
          ) {
            data.class[ 0 ] += ' cursor-pointer';

            if (props.onRowClick !== void 0) {
              data.onClick = evt => {
                emit('RowClick', evt, scope.row, scope.pageIndex);
              };
            }

            if (props.onRowDblclick !== void 0) {
              data.onDblclick = evt => {
                emit('RowDblclick', evt, scope.row, scope.pageIndex);
              };
            }

            if (props.onRowContextmenu !== void 0) {
              data.onContextmenu = evt => {
                emit('rowContextmenu', evt, scope.row, scope.pageIndex);
              };
            }
          }

          return h('div', {
            class: 'q-table__grid-item col-xs-12 col-sm-6 col-md-4 col-lg-3'
              + (scope.selected === true ? ' q-table__grid-item--selected' : '')
          }, [
            h('div', data, child)
          ])
        };

      return h('div', {
        class: [
          'q-table__grid-content row',
          props.cardContainerClass
        ],
        style: props.cardContainerStyle
      }, computedRows.value.map((row, pageIndex) => {
        return item(getBodyScope({
          key: getRowKey.value(row),
          row,
          pageIndex
        }))
      }))
    }

    // expose public methods and needed computed props
    Object.assign(vm.proxy, {
      requestServerInteraction,
      setPagination,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      isRowSelected,
      clearSelection,
      isRowExpanded,
      setExpanded,
      sort,
      resetVirtualScroll,
      scrollTo,
      getCellValue
    });

    injectMultipleProps(vm.proxy, {
      filteredSortedRows: () => filteredSortedRows.value,
      computedRows: () => computedRows.value,
      computedRowsNumber: () => computedRowsNumber.value
    });

    return () => {
      const child = [ getTopDiv() ];
      const data = { ref: rootRef, class: rootContainerClass.value };

      if (props.grid === true) {
        child.push(getGridHeader());
      }
      else {
        Object.assign(data, {
          class: [ data.class, props.cardClass ],
          style: props.cardStyle
        });
      }

      child.push(
        getBody(),
        getBottomDiv()
      );

      if (props.loading === true && slots.loading !== void 0) {
        child.push(
          slots.loading()
        );
      }

      return h('div', data, child)
    }
  }
});

const _sfc_main = {
  __name: "pricing",
  __ssrInlineRender: true,
  setup(__props) {
    usePageSeo("計費方案 - DogFriend", "查看各種護理服務的價格與方案");
    const columns = [
      { name: "type", label: "方案", field: "type" },
      { name: "price", label: "價格", field: "price" },
      { name: "desc", label: "內容", field: "desc" }
    ];
    const plans = [
      { type: "按時付費", price: "NT$300/時", desc: "彈性選擇看護時數" },
      { type: "包班制", price: "NT$6000/天", desc: "全天候專業照護" }
    ];
    const route = useRoute();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl || "";
    useHead({
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "計費方案 - DogFriend",
            url: baseUrl + route.fullPath,
            itemListElement: plans.map((p) => ({
              "@type": "Offer",
              price: p.price.replace("NT$", ""),
              priceCurrency: "TWD",
              itemOffered: {
                "@type": "Service",
                name: p.type,
                description: p.desc
              }
            }))
          })
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_page = __nuxt_component_0;
      const _component_q_card = __nuxt_component_1;
      const _component_q_card_section = __nuxt_component_2;
      const _component_q_table = __nuxt_component_3;
      _push(ssrRenderComponent(_component_q_page, mergeProps({ class: "q-pa-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_q_card, {
              flat: "",
              bordered: "",
              class: "info-card"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_q_card_section, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="text-h6"${_scopeId3}>價格資訊</div>`);
                        _push4(ssrRenderComponent(_component_q_table, {
                          rows: plans,
                          columns,
                          flat: "",
                          bordered: "",
                          class: "q-mt-md"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "text-h6" }, "價格資訊"),
                          createVNode(_component_q_table, {
                            rows: plans,
                            columns,
                            flat: "",
                            bordered: "",
                            class: "q-mt-md"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_q_card_section, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "text-h6" }, "價格資訊"),
                        createVNode(_component_q_table, {
                          rows: plans,
                          columns,
                          flat: "",
                          bordered: "",
                          class: "q-mt-md"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_q_card, {
                flat: "",
                bordered: "",
                class: "info-card"
              }, {
                default: withCtx(() => [
                  createVNode(_component_q_card_section, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-h6" }, "價格資訊"),
                      createVNode(_component_q_table, {
                        rows: plans,
                        columns,
                        flat: "",
                        bordered: "",
                        class: "q-mt-md"
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/info/pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=pricing-Bfd-IxeZ.mjs.map
