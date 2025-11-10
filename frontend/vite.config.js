// Citation for the following function:
// Date: 11/05/2025
// Adapted from: Official Vite documentation and assistance from ChatGPT (OpenAI GPT-5 model)
// Source URL: https://vitejs.dev/config/
// Type: source code (configuration file)
// Author: Evan You and the Vite Team
// Code version: Vite 5
// AI Tool Use: help and code explanation provided by ChatGPT to set up a React + Vite project configuration file.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";  // the plugin

export default defineConfig({
  plugins: [react()], // can you React in our project
  server: {
    host: "0.0.0.0", // people can access the server
    port: 9902     // server runs on port number
  }
});