// Copyright The Linux Foundation and each contributor to LFX.
// SPDX-License-Identifier: MIT

export const lfxComponentTokens = {
  avatar: {
    width: '1.75rem',
    height: '1.75rem',
    border: {
      radius: '0.5rem',
    },
  },
  breadcrumb: {
    padding: '0',
  },
  button: {
    padding: {
      x: '1.75rem',
      y: '0.75rem',
    },
    border: {
      color: 'transparent',
      radius: '0.5rem',
    },
    label: {
      font: {
        weight: 'normal',
      },
    },
    colorScheme: {
      light: {
        primary: {
          background: '{primary.500}',
          color: '#fff',
          borderColor: 'transparent',
          hover: {
            background: '{primary.700}',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
        secondary: {
          background: '{primary.100}',
          color: '{primary.500}',
          borderColor: 'transparent',
          hover: {
            background: '{primary.100}',
            color: '{primary.700}',
            borderColor: 'transparent',
          },
        },
        success: {
          background: '{emerald.500}',
          color: '#fff',
          borderColor: 'transparent',
          hover: {
            background: '{emerald.700}',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
        info: {
          background: '{blue.500}',
          color: '#fff',
          borderColor: 'transparent',
          hover: {
            background: '{blue.700}',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
        warn: {
          background: '{amber.500}',
          color: '#fff',
          borderColor: 'transparent',
          hover: {
            background: '{amber.700}',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
        danger: {
          background: '{red.500}',
          color: '#fff',
          borderColor: 'transparent',
          hover: {
            background: '{red.700}',
            color: '#fff',
            borderColor: 'transparent',
          },
        },
      },
    },
  },
  card: {
    body: {
      padding: '1.5rem 2rem',
      gap: '1.5rem',
    },
  },
  checkbox: {
    width: '1rem',
    height: '1rem',
    border: {
      color: '#EBEDF0',
    },
  },
  chip: {
    padding: {
      x: '0.25rem',
      y: '0.25rem',
    },
    border: {
      radius: '0.25rem',
      width: '1px',
    },
    colorScheme: {
      background: 'transparent',
      light: {
        success: {
          background: '{emerald.100}',
          color: '{emerald.900}',
          border: {
            color: '{emerald.300}',
          },
        },
        info: {
          background: '{blue.100}',
          color: '{blue.900}',
          border: {
            color: '{blue.300}',
          },
        },
        warn: {
          background: '{amber.100}',
          color: '{amber.900}',
          border: {
            color: '{amber.300}',
          },
        },
        error: {
          background: '{red.100}',
          color: '{red.900}',
          border: {
            color: '{red.300}',
          },
        },
      },
    },
  },
  datatable: {
    body: {
      cell: {
        border: {
          color: 'transparent',
        },
      },
    },
    colorScheme: {
      light: {
        header: {
          cell: {
            border: {
              color: 'transparent',
            },
          },
        },
      },
    },
    column: {
      title: {
        font: {
          weight: '400',
        },
      },
    },
  },
  dialog: {
    header: {
      padding: '1.5rem 2rem',
    },
    title: {
      font: {
        weight: '600',
        size: '1.375rem',
      },
    },
    content: {
      padding: '0 2rem 1.5rem',
    },
    body: {
      padding: {
        x: '2rem',
        y: '1.75rem',
      },
    },
  },
  inputtext: {
    color: '{gray.500}',
    border: {
      color: '#EBEDF0',
    },
    placeholder: {
      color: '{gray.500}',
    },
    sm: {
      font: {
        size: '0.75rem',
      },
    },
    padding: {
      x: '0.5rem',
      y: '0.25rem',
    },
    shadow: 'none',
  },
  menu: {
    item: {
      border: {
        radius: '0.5rem',
      },
    },
    colorScheme: {
      light: {
        item: {
          focus: {
            background: '{primary.100}',
          },
        },
      },
    },
  },
  multiselect: {
    color: '{gray.500}',
    border: {
      color: '#EBEDF0',
    },
    disabled: {
      background: '{gray.50}',
    },
    placeholder: {
      color: '{gray.500}',
    },
    padding: {
      x: '0.5rem',
      y: '0.25rem',
    },
    shadow: 'none',
    sm: {
      font: {
        size: '0.75rem',
      },
    },
  },
  select: {
    color: '{gray.500}',
    disabled: {
      background: '{gray.50}',
    },
    border: {
      color: '#EBEDF0',
    },
    placeholder: {
      color: '{gray.500}',
    },
    padding: {
      x: '0.5rem',
      y: '0.25rem',
    },
    shadow: 'none',
    sm: {
      font: {
        size: '0.75rem',
      },
    },
  },
  toast: {
    width: '30.25rem',
    border: {
      radius: '0.5rem',
      width: '1px',
    },
    content: {
      padding: '0.75rem 1rem',
      gap: '0.5rem',
    },
    icon: {
      size: '1rem',
    },
    summary: {
      font: {
        size: '0.875rem',
        weight: '600',
      },
    },
    detail: {
      font: {
        size: '0.875rem',
        weight: '400',
      },
    },
    close: {
      icon: {
        size: '0.75rem',
      },
      button: {
        width: '0.5rem',
        height: '0.5rem',
      },
    },
    colorScheme: {
      light: {
        info: {
          background: '{primary.100}',
          border: {
            color: '{primary.300}',
          },
          color: '{primary.900}',
          detail: {
            color: '{primary.900}',
          },
        },
        error: {
          background: '{red.100}',
          border: {
            color: '{red.300}',
          },
          color: '{red.900}',
          detail: {
            color: '{red.900}',
          },
        },
        success: {
          background: '{emerald.100}',
          border: {
            color: '{emerald.300}',
          },
          color: '{emerald.900}',
          detail: {
            color: '{emerald.900}',
          },
        },
        warn: {
          background: '{amber.100}',
          border: {
            color: '{amber.300}',
          },
          color: '{amber.900}',
          detail: {
            color: '{amber.900}',
          },
        },
      },
    },
  },
  tooltip: {
    colorScheme: {
      light: {
        background: '{primary.100}',
        color: '{primary.900}',
        border: {
          radius: '0.5rem',
        },
      },
    },
  },
};
