# github-access-token (GAT) Read Me

[Source code]( https://github.com/pushme-pullyou/tootoo14/tree/master/js-14-1 )

<details open >

<summary>Concept</summary>

<h3>GitHub API Access Token</h3>

This script uses the GitHub API to obtain the names of folders and files displayed in this menu.

In rare circumstances your usage may push the requests over the sixty requests per hour limit,
no list of files will appear and this script will display an error message.
After an or so so, the rates limit is automatically reset and menus will again display as expected.


<p>
If you are testing or building new menus or whatever,
you may obtain access tokens from GitHub at no charge and enter the token into the text box.
This will raise your limit to 5,000 requests per hour.
</p>
<p>
See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.
</p>
<p>
<button id=butGATpop onclick=MNU.rateLimits(butGATpop); title='If files and folder stop appearing, it is likely due to too many API calls' >View GitHub API rate limits</button>
</p>

</details>

<details>

<summary>To Do / Wish List</summary>


</details>

<details>

<summary>Issues</summary>


</details>

<details>

<summary>Change Log</summary>

### 2019-05-28 ~ Theo

* F - GAT: First commit / WIP

</details>