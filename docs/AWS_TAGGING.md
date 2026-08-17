# Separación de Costos AWS por Etiquetas (Cost Allocation Tags)

## Resumen

Este proyecto utiliza **etiquetas de AWS (tags)** para separar y rastrear los costos asociados a cada proyecto dentro de una misma cuenta de AWS. Esto permite:

- Identificar cuánto cuesta operar este portafolio mensualmente
- Generar reportes de facturación filtrados por proyecto
- Tener visibilidad granular en AWS Cost Explorer y AWS Budgets

---

## Estándar de Etiquetado

Todos los recursos AWS asociados a este proyecto **deben** llevar las siguientes etiquetas:

| Clave            | Valor                         | Descripción                              |
| ---------------- | ----------------------------- | ---------------------------------------- |
| `Project`        | `david-barrera-portafolio`    | Nombre del proyecto                      |
| `Environment`    | `production`                  | Entorno del recurso                      |
| `Owner`          | `david-barrera`               | Responsable del recurso                  |
| `CostCenter`     | `personal-portfolio`          | Centro de costos para facturación        |
| `ManagedBy`      | `github-actions`              | Quién gestiona el recurso                |
| `Repository`     | `sebasgao05/DavidBarreraDevCom` | Repositorio fuente                    |

---

## Recursos a Etiquetar

| Servicio     | Recurso                          | Identificador (Secret)        |
| ------------ | -------------------------------- | ----------------------------- |
| S3           | Bucket de deploy                 | `DEPLOY_BUCKET_NAME`          |
| CloudFront   | Distribución CDN                 | `DEPLOY_DISTRIBUTION_ID`      |
| Route 53     | Zona hospedada (si aplica)       | Configuración manual          |
| ACM          | Certificado SSL (si aplica)      | Configuración manual          |

---

## Paso a Paso para Implementar

### 1. Activar Cost Allocation Tags en AWS Billing

1. Ir a **AWS Billing Console** → **Cost Allocation Tags**
2. Buscar las etiquetas `Project`, `Environment`, `Owner`, `CostCenter`
3. Seleccionarlas y hacer clic en **"Activate"**
4. Las etiquetas tardan ~24 horas en aparecer en los reportes de costos

### 2. Aplicar Tags a los Recursos Existentes

Ejecutar el script de tagging:

```bash
# Desde la raíz del proyecto
chmod +x infrastructure/apply-tags.sh
./infrastructure/apply-tags.sh
```

O manualmente con AWS CLI:

```bash
# Etiquetar el bucket S3
aws s3api put-bucket-tagging \
  --bucket <BUCKET_NAME> \
  --tagging 'TagSet=[
    {Key=Project,Value=david-barrera-portafolio},
    {Key=Environment,Value=production},
    {Key=Owner,Value=david-barrera},
    {Key=CostCenter,Value=personal-portfolio},
    {Key=ManagedBy,Value=github-actions},
    {Key=Repository,Value=sebasgao05/DavidBarreraDevCom}
  ]'

# Etiquetar la distribución CloudFront
aws cloudfront tag-resource \
  --resource <DISTRIBUTION_ARN> \
  --tags 'Items=[
    {Key=Project,Value=david-barrera-portafolio},
    {Key=Environment,Value=production},
    {Key=Owner,Value=david-barrera},
    {Key=CostCenter,Value=personal-portfolio},
    {Key=ManagedBy,Value=github-actions},
    {Key=Repository,Value=sebasgao05/DavidBarreraDevCom}
  ]'
```

### 3. Verificar Tags Aplicados

```bash
# Verificar tags del bucket
aws s3api get-bucket-tagging --bucket <BUCKET_NAME>

# Verificar tags de CloudFront
aws cloudfront list-tags-for-resource --resource <DISTRIBUTION_ARN>
```

### 4. Configurar Reportes de Costos

1. **Cost Explorer**: Filtrar por tag `Project = david-barrera-portafolio`
2. **AWS Budgets**: Crear un presupuesto filtrado por la etiqueta `Project`
3. **Cost and Usage Reports (CUR)**: Incluir tags en el reporte detallado

### 5. Crear un Presupuesto (Opcional pero Recomendado)

```bash
aws budgets create-budget \
  --account-id <ACCOUNT_ID> \
  --budget '{
    "BudgetName": "david-barrera-portafolio-monthly",
    "BudgetLimit": {"Amount": "5", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST",
    "CostFilters": {
      "TagKeyValue": ["user:Project$david-barrera-portafolio"]
    }
  }' \
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80,
      "ThresholdType": "PERCENTAGE"
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "sebasgao05@icloud.com"
    }]
  }]'
```

---

## CI/CD: Tags Automáticos en Deploy

El workflow de GitHub Actions (`deploy.yml`) incluye un paso para verificar y mantener los tags en cada despliegue. Esto garantiza que los tags no se pierdan accidentalmente.

---

## Consultar Costos por Proyecto

Desde la consola de AWS:

1. Ir a **Cost Explorer**
2. Agrupar por **Tag: Project**
3. Filtrar por `david-barrera-portafolio`

Con AWS CLI:

```bash
aws ce get-cost-and-usage \
  --time-period Start=2026-08-01,End=2026-08-31 \
  --granularity MONTHLY \
  --metrics "BlendedCost" \
  --filter '{
    "Tags": {
      "Key": "Project",
      "Values": ["david-barrera-portafolio"]
    }
  }'
```

---

## Notas Importantes

- Las etiquetas son **case-sensitive** en AWS
- Los tags tardan ~24h en reflejarse en reportes de facturación después de activarlos
- Si agregas nuevos recursos AWS al proyecto, asegúrate de aplicar los mismos tags
- El tag `Project` es el principal discriminador para la separación de costos
