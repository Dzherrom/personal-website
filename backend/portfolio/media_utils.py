def absolute_file_url(file_field, request) -> str:
    if not file_field:
        return ""

    url = file_field.url
    if url.startswith(("http://", "https://")):
        return url

    if request is not None:
        return request.build_absolute_uri(url)

    return url


def resolve_file_url(file_field, fallback_url: str, request) -> str:
    """Prioriza URL pública (Netlify) sobre archivo subido al backend."""
    if fallback_url:
        return fallback_url
    return absolute_file_url(file_field, request)


def resolve_preview_image(file_field, fallback_url: str, request) -> str:
    return resolve_file_url(file_field, fallback_url, request)
