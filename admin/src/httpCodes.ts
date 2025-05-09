export default {
    100: "Continue: the initial headers were received; continue with the request body",
    101: "Switching Protocols: the server is switching protocols as requested",
    102: "Processing: the server is processing the request but a complete response isn’t ready yet",
    103: "Early Hints: preliminary headers are being sent before the final response",
    200: "OK: response sent",
    201: "Created: a new resource was created successfully",
    202: "Accepted: the request has been accepted for processing but isn’t complete yet",
    203: "Non-Authoritative Information: the response contains modified information from a third party",
    204: "No Content: the request succeeded but there’s no content to return",
    205: "Reset Content: the request succeeded; please reset your view",
    206: "Partial Content: only part of the resource is being returned as requested",
    207: "Multi-Status: the response contains several status codes for different parts of the request",
    208: "Already Reported: the resource has already been reported in a previous response",
    226: "IM Used: the server fulfilled the request using instance manipulations",
    300: "Multiple Choices: several options are available for the requested resource",
    301: "Moved Permanently: the resource has been permanently moved to a new URL",
    302: "Found: the resource is temporarily located at a different URL",
    303: "See Other: the requested resource can be found using GET at another URL",
    304: "Not Modified: the browser was asked to use its cached version, and the file was not actually sent",
    305: "Use Proxy: the requested resource must be accessed through the specified proxy",
    306: "Switch Proxy: this code is no longer used but is reserved for future use",
    307: "Temporary Redirect: the resource is temporarily available at a different URL; use the original for future requests",
    308: "Permanent Redirect: the resource has been permanently moved to another URL",
    400: "Bad Request: the request is malformed or contains invalid parameters",
    401: "Unauthorized: authentication is required and was either not provided or failed",
    402: "Payment Required: payment is required to access this resource (reserved for future use)",
    403: "Forbidden: the server understands the request but refuses to authorize it",
    404: "Not Found: the requested resource could not be found",
    405: "Method Not Allowed: the HTTP method used isn’t allowed for this resource",
    406: "Not Acceptable: the resource can’t produce content acceptable according to the request",
    407: "Proxy Authentication Required: proxy authentication is required to access the resource",
    408: "Request Timeout: the server timed out waiting for the request",
    409: "Conflict: the request couldn’t be processed due to a conflict",
    410: "Gone: the requested resource is no longer available",
    411: "Length Required: the request didn’t include the required content length",
    412: "Precondition Failed: one or more conditions in the request header failed",
    413: "Payload Too Large: the request payload is too large for the server to process",
    414: "URI Too Long: the URL provided is too long",
    415: "Unsupported Media Type: the media type is not supported by the server",
    416: "Range Not Satisfiable: the requested range cannot be fulfilled by the server",
    417: "Expectation Failed: the server can’t meet the expectations in the request’s header",
    418: "I'm a Teapot: this code is a humorous reference and not meant for real use",
    421: "Misdirected Request: the request was sent to a server that can’t produce a response",
    422: "Unprocessable Entity: the request was well-formed but contains semantic errors",
    423: "Locked: the resource is locked and can’t be accessed",
    424: "Failed Dependency: the request failed because a previous request did not succeed",
    425: "Too Early: the server refuses to process the request to prevent replay attacks",
    426: "Upgrade Required: the client should switch to a different protocol",
    428: "Precondition Required: the server requires the request to be conditional",
    429: "Too Many Requests: too many requests have been sent in a short period",
    431: "Request Header Fields Too Large: the request’s header fields are too large",
    451: "Unavailable For Legal Reasons: the resource is unavailable due to legal restrictions",
    500: "Internal Server Error: the server encountered an unexpected error",
    501: "Not Implemented: the server does not support the requested functionality",
    502: "Bad Gateway: the server received an invalid response from an upstream server",
    503: "Service Unavailable: the server is currently unable to handle the request",
    504: "Gateway Timeout: the server did not receive a timely response from an upstream server",
    505: "HTTP Version Not Supported: the server does not support the HTTP version used",
    506: "Variant Also Negotiates: a circular reference was detected during content negotiation",
    507: "Insufficient Storage: the server is unable to store the requested resource",
    508: "Loop Detected: the server detected an infinite loop while processing the request",
    510: "Not Extended: additional extensions are needed to fulfill the request",
    511: "Network Authentication Required: network access requires proper authentication"
} as { [code: number | string]: string }