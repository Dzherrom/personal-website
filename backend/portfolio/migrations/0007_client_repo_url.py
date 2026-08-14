from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("portfolio", "0006_project_preview_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="client",
            name="repo_url",
            field=models.URLField(blank=True, help_text="Repositorio en GitHub del proyecto"),
        ),
    ]
