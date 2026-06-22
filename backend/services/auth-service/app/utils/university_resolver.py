def resolve_university_by_email(email: str) -> str | None:
    domain = email.split("@")[-1].lower()

    universities_by_domain = {
        "autonoma.edu.pe": "Universidad Autónoma del Perú"
    }

    return universities_by_domain.get(domain)