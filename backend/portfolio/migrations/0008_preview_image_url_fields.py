from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0007_client_repo_url"),
    ]

    operations = [
        migrations.AddField(
            model_name="client",
            name="preview_image_url",
            field=models.URLField(
                blank=True,
                help_text="URL pública alternativa (p. ej. imagen en Netlify). Se usa si no hay archivo subido.",
            ),
        ),
        migrations.AddField(
            model_name="project",
            name="preview_image_url",
            field=models.URLField(
                blank=True,
                help_text="URL pública alternativa (p. ej. imagen en Netlify). Se usa si no hay archivo subido.",
            ),
        ),
    ]
