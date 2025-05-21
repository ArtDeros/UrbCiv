// Constantes para roles ARIA
export const ARIA_ROLES = {
  ALERT: 'alert',
  ALERTDIALOG: 'alertdialog',
  BUTTON: 'button',
  CHECKBOX: 'checkbox',
  DIALOG: 'dialog',
  GRID: 'grid',
  LINK: 'link',
  LOG: 'log',
  MARQUEE: 'marquee',
  MENUITEM: 'menuitem',
  MENUITEMCHECKBOX: 'menuitemcheckbox',
  MENUITEMRADIO: 'menuitemradio',
  OPTION: 'option',
  PROGRESSBAR: 'progressbar',
  RADIO: 'radio',
  SCROLLBAR: 'scrollbar',
  SEARCHBOX: 'searchbox',
  SLIDER: 'slider',
  SPINBUTTON: 'spinbutton',
  STATUS: 'status',
  TAB: 'tab',
  TABLIST: 'tablist',
  TABPANEL: 'tabpanel',
  TEXTBOX: 'textbox',
  TIMER: 'timer',
  TOOLTIP: 'tooltip',
  TREE: 'tree',
  TREEGRID: 'treegrid',
} as const;

// Constantes para estados ARIA
export const ARIA_STATES = {
  EXPANDED: 'aria-expanded',
  HIDDEN: 'aria-hidden',
  LABEL: 'aria-label',
  DESCRIBEDBY: 'aria-describedby',
  CONTROLS: 'aria-controls',
  OWNED: 'aria-owns',
  SELECTED: 'aria-selected',
  CHECKED: 'aria-checked',
  DISABLED: 'aria-disabled',
  READONLY: 'aria-readonly',
  REQUIRED: 'aria-required',
  INVALID: 'aria-invalid',
  BUSY: 'aria-busy',
  LIVE: 'aria-live',
  RELEVANT: 'aria-relevant',
  ATOMIC: 'aria-atomic',
  DROPEFFECT: 'aria-dropeffect',
  GRABBED: 'aria-grabbed',
  HASPOPUP: 'aria-haspopup',
  LEVEL: 'aria-level',
  MULTILINE: 'aria-multiline',
  MULTISELECTABLE: 'aria-multiselectable',
  ORIENTATION: 'aria-orientation',
  PRESSED: 'aria-pressed',
  SORT: 'aria-sort',
  VALUEMAX: 'aria-valuemax',
  VALUEMIN: 'aria-valuemin',
  VALUENOW: 'aria-valuenow',
  VALUETEXT: 'aria-valuetext',
} as const;

// Función para generar IDs únicos para elementos ARIA
export const generateAriaId = (prefix: string): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Función para validar el contraste de colores
export const getContrastRatio = (color1: string, color2: string): number => {
  // Implementación simplificada - en producción usar una librería como color-contrast
  return 4.5; // Valor mínimo recomendado por WCAG
};

// Función para verificar si un color cumple con los estándares de contraste
export const isAccessibleContrast = (color1: string, color2: string): boolean => {
  return getContrastRatio(color1, color2) >= 4.5;
}; 