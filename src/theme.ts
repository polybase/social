import { extendTheme } from '@chakra-ui/react'
// import { mode } from '@chakra-ui/theme-tools'

// const $bg = cssVar('tooltip-bg')
const mode = (light: any, _dark: any) => ({ default: light, _dark })

const theme = extendTheme({
  // initialColorMode: 'light',
  semanticTokens: {
    colors: {
      error: 'red.500',
      'bw.50': mode('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.04)'),
      'bw.100': mode('rgba(0, 0, 0, 0.06)','rgba(255, 255, 255, 0.06)'),
      'bw.200': mode('rgba(0, 0, 0, 0.08)', 'rgba(255, 255, 255, 0.08)'),
      'bw.300': mode('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.16)'),
      'bw.400': mode('rgba(0, 0, 0, 0.24)', 'rgba(255, 255, 255, 0.24)'),
      'bw.500': mode('rgba(0, 0, 0, 0.36)', 'rgba(255, 255, 255, 0.36)'),
      'bw.600': mode('rgba(0, 0, 0, 0.48)', 'rgba(255, 255, 255, 0.48)'),
      'bw.700': mode('rgba(0, 0, 0, 0.64)', 'rgba(255, 255, 255, 0.64)'),
      'bw.800': mode('rgba(0, 0, 0, 0.80)', 'rgba(255, 255, 255, 0.80)'),
      'bw.900': mode('rgba(0, 0, 0, 0.92)', 'rgba(255, 255, 255, 0.92)'),
    },
  },
  useSystemColorMode: true,
})

export default theme


// const theme = extendTheme({
//   fonts: {
//     body: 'Open Sans',
//     heading: 'Open Sans',
//     mono: 'Menlo, monospace',
//   },
//   components: {
//     FormLabel: {
//       baseStyle: {
//         fontWeight: 'bold',
//       },
//     },
//     Tooltip: {
//       baseStyle: (props: any) => {
//         const bg = mode('gray.800', 'gray.300')(props)
//         return {
//           [$bg.variable]: `colors.${bg}`,
//           bg: [$bg.reference],
//         }
//       },
//     },
//     Popover: {
//       baseStyle: {
//         header: {
//           fontWeight: 'bold',
//         },
//         content: {
//           _focus: {
//             outline: 0,
//             boxShadow: 'sm',
//           },
//         },
//       },
//     },
//     Tabs: {
//       sizes: {
//         md: {
//           tab: {
//             py: 2,
//             px: 4,
//             fontSize: '0.95em',
//           },
//         },
//       },
//       variants: {
//         line: (props: any) => {
//           const { colorScheme: c, orientation } = props
//           const isVertical = orientation === 'vertical'
//           const borderProp = orientation === 'vertical' ? 'borderStart' : 'borderBottom'
//           const marginProp = isVertical ? 'marginStart' : 'marginBottom'

//           return {
//             tablist: {
//               [borderProp]: '1px solid',
//               borderColor: 'gray.100',
//             },
//             tab: {
//               fontWeight: 'bold',
//               color: 'gray.500',
//               [borderProp]: '0px solid',
//               borderColor: 'transparent',
//               // [marginProp]: "-1px",
//               // _selected: {
//               //   color: mode(`${c}.600`, `${c}.300`)(props),
//               //   borderColor: "currentColor",
//               // },
//               // _active: {
//               //   bg: mode("gray.200", "whiteAlpha.300")(props),
//               // },
//               _disabled: {
//                 opacity: 0.4,
//                 cursor: 'not-allowed',
//               },
//             },
//           }
//         },
//       },
//       baseStyle: {
//         tab: {
//           _focus: {
//             boxShadow: 'none',
//             outline: 'none',
//           },
//           _selected: {
//             fontWeight: 'semibold',
//           },
//         },
//       },
//     },
//     Button: {
//       baseStyle: {
//         outline: 'none',
//         boxShadow: 'none',
//       },
//     },
//   },
//   textStyles: {
//     note: {
//       color: 'gray.600',
//       fontSize: 'sm',
//     },
//   },
//   layerStyles: {
//     card: {
//       border: '1px solid',
//       borderColor: 'gray.300',
//       _hover: {
//         bg: 'gray.100',
//       },
//     },
//     cardSelected: {
//       border: '1px solid',
//       borderColor: 'green.500',
//       bg: 'green.100',
//       color: 'green.800',
//     },
//     list: {
//       _hover: {
//         bg: 'gray.100',
//       },
//     },
//   },
//   colors: {
//     brand: {
//       '50': '#EBF9F6',
//       '100': '#C8EFE5',
//       '200': '#A4E5D4',
//       '300': '#80DAC3',
//       '400': '#5DD0B2',
//       '500': '#00B682',
//       '600': '#2E9E81',
//       '700': '#227761',
//       '800': '#174F40',
//       '900': '#0B2820',
//     },
//     gray: {
//       '50': '#FAFAFA',
//       100: '#EDEDED',
//       '200': '#DBDBDB',
//       '300': '#C4C4C4',
//       '400': '#ADADAD',
//       '500': '#969696',
//       '600': '#838383',
//       '700': '#666666',
//       '800': '#333333',
//       '900': '#1A1A1A',
//     },
//     blue: {
//       50: '#EAF1FA',
//       100: '#C5D7F1',
//       200: '#A0BDE8',
//       300: '#7BA4E0',
//       400: '#568AD7',
//       500: '#3170CE',
//       600: '#275AA5',
//       700: '#1D437C',
//       800: '#142D52',
//       900: '#0A1629',
//     },
//   },
// }, withDefaultColorScheme({ colorScheme: 'gray' }))

