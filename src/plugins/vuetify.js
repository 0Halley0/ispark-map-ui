// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import { lightThemeColors, darkThemeColors } from "../theme";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: lightThemeColors,
      },
      dark: {
        colors: darkThemeColors,
      },
    },
  },
});
