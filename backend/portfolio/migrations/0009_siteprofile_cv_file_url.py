from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0008_preview_image_url_fields"),
    ]

    operations = [
        migrations.AddField(
            model_name="siteprofile",
            name="cv_file_url",
            field=models.URLField(
                blank=True,
                help_text="URL pública del CV en Netlify, ej. https://dzherrom.netlify.app/cvs/mi-cv.pdf",
            ),
        ),
    ]
