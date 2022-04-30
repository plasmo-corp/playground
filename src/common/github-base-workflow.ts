export const baseGitHubWorkflow = {
  name: "Deploy to Webstore",
  on: {
    workflow_dispatch: null
  },
  jobs: {
    build: {
      "runs-on": "ubuntu-latest",
      name:" Build ${{ matrix.platform }}",
      strategy: {
        matrix: {
          platform: [
            "chrome",
            "firefox"
          ]
        }
      },
      steps: []
    }
  }
}
