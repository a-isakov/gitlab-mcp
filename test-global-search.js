#!/usr/bin/env node

// Test script to demonstrate global search functionality
// This can be used to test the MCP server's new global search capabilities

const examples = [
  {
    name: "Search merge requests globally by text",
    request: {
      method: "search_merge_requests_globally",
      params: {
        arguments: {
          search: "AI3-10782",
          state: "all",
          per_page: 10
        }
      }
    }
  },
  {
    name: "Global search for merge requests",
    request: {
      method: "search_globally",
      params: {
        arguments: {
          search: "AI3-10782",
          scope: "merge_requests",
          state: "all",
          per_page: 10
        }
      }
    }
  },
  {
    name: "Global search for commits",
    request: {
      method: "search_globally",
      params: {
        arguments: {
          search: "fix bug",
          scope: "commits",
          per_page: 10
        }
      }
    }
  },
  {
    name: "Global search for issues with specific text",
    request: {
      method: "search_globally",
      params: {
        arguments: {
          search: "error handling",
          scope: "issues",
          state: "opened",
          per_page: 10
        }
      }
    }
  },
  {
    name: "Search in a specific group",
    request: {
      method: "search_globally",
      params: {
        arguments: {
          search: "AI3-10782",
          scope: "merge_requests",
          group_id: "6775852",
          per_page: 10
        }
      }
    }
  }
];

console.log("GitLab MCP Server - Global Search Examples");
console.log("==========================================\n");

examples.forEach((example, index) => {
  console.log(`${index + 1}. ${example.name}`);
  console.log("Request:");
  console.log(JSON.stringify(example.request, null, 2));
  console.log("\n");
});

console.log("To use these examples:");
console.log("1. Start the MCP server with: npm start");
console.log("2. Send these requests to the server using the MCP protocol");
console.log("3. The server will return search results from GitLab's global search API");