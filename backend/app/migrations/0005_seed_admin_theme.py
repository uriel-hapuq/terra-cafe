from django.db import migrations


def seed_admin_theme(apps, schema_editor):
    Theme = apps.get_model("admin_interface", "Theme")
    defaults = {
        "active": True,
        "title": "Administra\u00e7\u00e3o do TerraCafe",
        "title_color": "#ffffff",
        "title_visible": True,
        "logo": "",
        "logo_color": "#FFFFFF",
        "logo_max_width": 400,
        "logo_max_height": 100,
        "logo_visible": False,
        "favicon": "",
        "env_name": "TerraCaf\u00e9",
        "env_color": "#2ecc71",
        "env_visible_in_header": True,
        "env_visible_in_favicon": True,
        "language_chooser_active": True,
        "language_chooser_control": "default-select",
        "language_chooser_display": "name",
        "css_header_background_color": "#4a2e1b",
        "css_header_text_color": "#f5ebe6",
        "css_header_link_color": "#d4a373",
        "css_header_link_hover_color": "#faedcd",
        "css_module_background_color": "#5c3a21",
        "css_module_background_selected_color": "#d4a373",
        "css_module_text_color": "#f5ebe6",
        "css_module_link_color": "#faedcd",
        "css_module_link_selected_color": "#FFFFFF",
        "css_module_link_hover_color": "#ccd5ae",
        "css_module_rounded_corners": True,
        "css_generic_link_color": "#6b4226",
        "css_generic_link_hover_color": "#a0522d",
        "css_generic_link_active_color": "#a0522d",
        "css_save_button_background_color": "#4a2e1b",
        "css_save_button_background_hover_color": "#5c3a21",
        "css_save_button_text_color": "#FFFFFF",
        "css_delete_button_background_color": "#8b3a2b",
        "css_delete_button_background_hover_color": "#a04030",
        "css_delete_button_text_color": "#FFFFFF",
        "related_modal_active": True,
        "related_modal_background_color": "#2c1e12",
        "related_modal_background_opacity": "0.3",
        "related_modal_rounded_corners": True,
        "related_modal_close_button_visible": True,
        "list_filter_highlight": True,
        "list_filter_dropdown": True,
        "list_filter_sticky": True,
        "list_filter_removal_links": True,
        "foldable_apps": True,
        "show_fieldsets_as_tabs": False,
        "show_inlines_as_tabs": False,
        "collapsible_stacked_inlines": False,
        "collapsible_stacked_inlines_collapsed": True,
        "collapsible_tabular_inlines": False,
        "collapsible_tabular_inlines_collapsed": True,
        "recent_actions_visible": False,
        "form_actions_sticky": True,
        "form_submit_sticky": True,
        "form_pagination_sticky": True,
    }
    theme, _ = Theme.objects.get_or_create(
        name="TerraCaf\u00e9 - Estiliza\u00e7\u00e3o",
        defaults=defaults,
    )
    Theme.objects.exclude(pk=theme.pk).update(active=False)
    if not theme.active:
        theme.active = True
        theme.save(update_fields=["active"])


class Migration(migrations.Migration):
    dependencies = [
        ("admin_interface", "0032_alter_theme_defaults"),
        ("app", "0004_alter_encomenda_data_recebimento_and_more"),
    ]

    operations = [
        migrations.RunPython(seed_admin_theme, migrations.RunPython.noop),
    ]