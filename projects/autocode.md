# Autocode — local coding agent

**Michail Sendetskiy · Python · Ollama · developer tools**

Autocode is a local coding-agent project. One of its engineering challenges is
turning model output into explicit, inspectable tool requests: the surrounding
software needs to recognize supported formats, validate arguments, and report
failures clearly.

[Read the portfolio case study](https://michail-sendetskiy.onetruepath.chatgpt.site/projects/autocode)

## Tool-call validation

The protocol layer checks a response against the defined tools and their
argument schemas. It returns a normalized request or a structured error.
Execution is a separate downstream decision.

For example, a synthetic response requests `read_file` with a string path.
The recorded check accepts and normalizes that request. It stops before any
file is read.

| Recorded protocol case | Observed outcome |
| --- | --- |
| Defined tool with a valid string path | Accepted and normalized |
| Undefined tool name | Rejected: `unknown_tool` |
| Missing required path | Rejected: `missing_required_arguments` |
| Argument outside the closed schema | Rejected: `unexpected_tool_arguments` |
| Number supplied instead of a string path | Rejected: `argument_type_mismatch` |
| Plain prose when a native call is required | Rejected: `native_call_required` |

## Dated component verification

**On 15 September 2026, all 19 selected existing unit tests passed, and all six
protocol examples produced their expected outcomes.** The check used the real,
unchanged implementation.

| Evidence | Detail |
| --- | --- |
| Source revision | `370219d4f6fce7c32623690e2418771275fcec10` |
| Environment | Windows, Python 3.14.2 |
| Selected unit tests | 19 passed; 0 failures, errors, or skips |
| Additional protocol examples | 6 expected outcomes |
| Scope | Isolated protocol and normalization components |

The selected tests cover tool definitions, argument schemas, configured
limits, response normalization, structured failures, and compatible native
response formats. The demonstration inputs are synthetic fixtures.

The check loaded the components independently and bypassed Linux-specific
package initialization. **The full Linux application, live model inference,
and tool execution were not run.** These results describe the selected
components; they do not establish the historical 369-test figure in the CV.

## Inspect the evidence

- [Verification JSON](https://michail-sendetskiy.onetruepath.chatgpt.site/assets/autocode-validation.json): exact sample inputs and outputs, provenance, limits, and source/test file hashes.
- [Actual unit-test output](https://michail-sendetskiy.onetruepath.chatgpt.site/assets/autocode-tests.txt): the recorded 19-test execution.
- [Portfolio case study](https://michail-sendetskiy.onetruepath.chatgpt.site/projects/autocode): project context and the component walkthrough.

The implementation source remains private. The public case study and evidence
provide an accessible technical example without publishing that source.

## More work

[Portfolio](https://michail-sendetskiy.onetruepath.chatgpt.site) ·
[LinkedIn](https://www.linkedin.com/in/michail-sendetskiy-63687a38/) ·
[CoopNavigationSDS](https://github.com/generalgroovy/sds) ·
[MIDILIN](https://github.com/generalgroovy/midilin) /
[MIDIWIN](https://github.com/generalgroovy/midiwin)
