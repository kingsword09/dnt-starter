# dnt-starter
Fast dnt template project.

`dnt` [Document](https://github.com/denoland/dnt)


### If you want to publish to the npm registry, modify the data in npm.json.
- Modify `name` `version` `description` `entryPoints`


### If you want to publish to the jsr registry, modify the data in deno.json.
- [jsr document](https://jsr.io/docs/publishing-packages)
- And to exclude scripts in deno.json
```json
{
  "exclude": ["scripts"]
}
```
