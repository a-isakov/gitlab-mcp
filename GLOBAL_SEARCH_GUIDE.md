# GitLab MCP Server - Global Search Guide

This guide explains the new global search functionality added to the GitLab MCP server.

## Overview

The GitLab MCP server now supports global search capabilities, allowing you to search across all accessible projects for:
- Merge requests
- Issues
- Commits
- Code (blobs)
- Wiki pages
- Snippets
- Users
- Milestones

## New Tools

### 1. `search_merge_requests_globally`

Search for merge requests across all accessible projects without specifying a project ID.

**Parameters:**
- `search` (optional): Search terms in title and description
- `state`: Filter by state ("opened", "closed", "locked", "merged", "all")
- `author_id` / `author_username`: Filter by author
- `assignee_id` / `assignee_username`: Filter by assignee
- `reviewer_id` / `reviewer_username`: Filter by reviewer
- `labels`: Array of label names
- `milestone`: Milestone title
- `created_after` / `created_before`: Date filters
- `updated_after` / `updated_before`: Date filters
- `page` / `per_page`: Pagination

**Example:**
```json
{
  "search": "AI3-10782",
  "state": "all",
  "per_page": 20
}
```

### 2. `search_globally`

Perform a global search across GitLab using the search API.

**Parameters:**
- `search` (required): The search query
- `scope` (required): What to search in
  - "projects"
  - "issues"
  - "merge_requests"
  - "commits"
  - "blobs" (code)
  - "wiki_blobs"
  - "snippet_titles"
  - "snippet_blobs"
  - "users"
  - "milestones"
- `project_id` (optional): Limit search to a specific project
- `group_id` (optional): Limit search to a specific group
- `state` (optional): Filter by state (for issues/merge_requests)
- `confidential` (optional): Filter confidential issues
- `order_by`: Order by "created_at" or "updated_at"
- `sort`: "asc" or "desc"
- `in` (optional): Modify search scope (e.g., "title", "description")

**Example:**
```json
{
  "search": "AI3-10782",
  "scope": "merge_requests",
  "group_id": "6775852",
  "state": "all"
}
```

## Usage Examples

### Search for a Merge Request by ID
```javascript
// Search across all projects
{
  "method": "search_merge_requests_globally",
  "params": {
    "arguments": {
      "search": "AI3-10782",
      "state": "all"
    }
  }
}
```

### Search for Commits with Specific Text
```javascript
{
  "method": "search_globally",
  "params": {
    "arguments": {
      "search": "fix: resolve memory leak",
      "scope": "commits",
      "per_page": 20
    }
  }
}
```

### Search in a Specific Group
```javascript
{
  "method": "search_globally",
  "params": {
    "arguments": {
      "search": "AI3-10782",
      "scope": "merge_requests",
      "group_id": "6775852"
    }
  }
}
```

### Search for Code (Blobs)
```javascript
{
  "method": "search_globally",
  "params": {
    "arguments": {
      "search": "class UserAuthentication",
      "scope": "blobs",
      "project_id": "12345"
    }
  }
}
```

## GitLab UI Equivalent

The global search functionality mirrors what you can do in the GitLab UI:
- `https://gitlab.com/search?group_id=6775852&scope=merge_requests&search=AI3-10782`

This URL search is now possible programmatically through the MCP server.

## Benefits

1. **No Project ID Required**: Search across all accessible projects without knowing specific project IDs
2. **Flexible Filtering**: Use the same filters available in GitLab's UI
3. **Multiple Scopes**: Search different types of content with one tool
4. **Group/Project Specific**: Optionally limit searches to specific groups or projects

## Notes

- The global search API respects GitLab permissions - you'll only see results you have access to
- Different scopes return different response formats
- Some filters only apply to specific scopes (e.g., `confidential` only works with issues)
- Results are paginated - use `page` and `per_page` parameters