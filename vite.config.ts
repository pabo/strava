import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: readFileSync(__dirname + '/certs/RSA-privkey.pem', 'utf8'),
      cert: readFileSync(__dirname + '/certs/RSA-cert.pem', 'utf8')
    },
  }
});
