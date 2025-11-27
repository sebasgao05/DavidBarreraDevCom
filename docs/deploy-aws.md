# Guía de Deployment en AWS

Esta guía te ayudará a desplegar tu portafolio en AWS usando S3 y CloudFront.

## 📋 Prerrequisitos

- Cuenta de AWS activa
- AWS CLI instalado y configurado
- Node.js y npm instalados

## 🏗️ Arquitectura

```
Usuario → CloudFront → S3 Bucket → Aplicación React
```

## 🪣 Configuración de S3

### 1. Crear Bucket S3

```bash
# Crear bucket (reemplaza 'tu-portafolio-bucket' con un nombre único)
aws s3 mb s3://tu-portafolio-bucket --region us-east-1
```

### 2. Habilitar Hosting Estático

```bash
# Configurar hosting estático
aws s3 website s3://tu-portafolio-bucket --index-document index.html --error-document index.html
```

### 3. Configurar Política de Bucket

Crea un archivo `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::tu-portafolio-bucket/*"
    }
  ]
}
```

Aplicar la política:

```bash
aws s3api put-bucket-policy --bucket tu-portafolio-bucket --policy file://bucket-policy.json
```

## ☁️ Configuración de CloudFront

### 1. Crear Distribución

```bash
# Crear archivo cloudfront-config.json
{
  "CallerReference": "portafolio-$(date +%s)",
  "Comment": "Portafolio Personal Distribution",
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-tu-portafolio-bucket",
        "DomainName": "tu-portafolio-bucket.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-tu-portafolio-bucket",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    }
  },
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
```

### 2. Crear la Distribución

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 🚀 Scripts de Deployment

### 1. Script de Build y Deploy

Crea `deploy.sh`:

```bash
#!/bin/bash

# Variables
BUCKET_NAME="tu-portafolio-bucket"
DISTRIBUTION_ID="TU_DISTRIBUTION_ID"

echo "🏗️  Construyendo aplicación..."
npm run build

echo "📦 Subiendo archivos a S3..."
aws s3 sync build/ s3://$BUCKET_NAME --delete --cache-control "public, max-age=31536000"

echo "🔄 Invalidando caché de CloudFront..."
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment completado!"
echo "🌐 Tu sitio estará disponible en unos minutos"
```

### 2. Hacer el Script Ejecutable

```bash
chmod +x deploy.sh
```

### 3. Ejecutar Deployment

```bash
./deploy.sh
```

## 🔧 Configuración Avanzada

### Compresión GZIP

Añadir a la configuración de CloudFront:

```json
"Compress": true
```

### Headers de Seguridad

Configurar Lambda@Edge para añadir headers:

```javascript
exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;
    const headers = response.headers;

    headers['strict-transport-security'] = [{
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubdomains; preload'
    }];

    headers['x-content-type-options'] = [{
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    }];

    headers['x-frame-options'] = [{
        key: 'X-Frame-Options',
        value: 'DENY'
    }];

    callback(null, response);
};
```

## 🌐 Dominio Personalizado

### 1. Registrar Dominio en Route 53

```bash
# Crear hosted zone
aws route53 create-hosted-zone --name tudominio.com --caller-reference $(date +%s)
```

### 2. Solicitar Certificado SSL

```bash
# Solicitar certificado (debe ser en us-east-1 para CloudFront)
aws acm request-certificate --domain-name tudominio.com --domain-name www.tudominio.com --validation-method DNS --region us-east-1
```

### 3. Configurar Alias en Route 53

```json
{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "tudominio.com",
        "Type": "A",
        "AliasTarget": {
          "DNSName": "d123456789.cloudfront.net",
          "EvaluateTargetHealth": false,
          "HostedZoneId": "Z2FDTNDATAQYW2"
        }
      }
    }
  ]
}
```

## 📊 Monitoreo y Analytics

### CloudWatch Metrics

- Requests
- Data Transfer
- Error Rate
- Cache Hit Ratio

### Configurar Alarmas

```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "High-Error-Rate" \
  --alarm-description "Alarm when error rate exceeds 5%" \
  --metric-name "4xxErrorRate" \
  --namespace "AWS/CloudFront" \
  --statistic "Average" \
  --period 300 \
  --threshold 5.0 \
  --comparison-operator "GreaterThanThreshold"
```

## 💰 Optimización de Costos

### S3 Storage Classes

- Standard: Para archivos accedidos frecuentemente
- IA (Infrequent Access): Para archivos menos accedidos
- Glacier: Para archivos de archivo

### CloudFront Price Classes

- PriceClass_All: Todas las ubicaciones
- PriceClass_200: América del Norte, Europa, Asia
- PriceClass_100: América del Norte y Europa (más económico)

## 🔒 Seguridad

### Bucket Policies

- Denegar acceso directo a S3
- Solo permitir acceso a través de CloudFront

### WAF (Web Application Firewall)

```bash
# Crear Web ACL
aws wafv2 create-web-acl \
  --name "PortafolioWAF" \
  --scope "CLOUDFRONT" \
  --default-action "Allow={}" \
  --region us-east-1
```

## 🚨 Troubleshooting

### Errores Comunes

1. **403 Forbidden**: Verificar políticas de bucket
2. **404 Not Found**: Configurar error document en S3
3. **Caché Issues**: Invalidar distribución CloudFront

### Comandos Útiles

```bash
# Ver estado de distribución
aws cloudfront get-distribution --id TU_DISTRIBUTION_ID

# Listar invalidaciones
aws cloudfront list-invalidations --distribution-id TU_DISTRIBUTION_ID

# Sincronizar solo archivos modificados
aws s3 sync build/ s3://tu-bucket --exclude "*" --include "*.html" --cache-control "no-cache"
```

## 📝 Checklist de Deployment

- [ ] Bucket S3 creado y configurado
- [ ] Política de bucket aplicada
- [ ] Distribución CloudFront creada
- [ ] Certificado SSL configurado (si usas dominio personalizado)
- [ ] DNS configurado en Route 53
- [ ] Scripts de deployment probados
- [ ] Monitoreo configurado
- [ ] Backup y versionado habilitado

## 🎯 Próximos Pasos

1. Configurar CI/CD con GitHub Actions
2. Implementar tests automatizados
3. Añadir analytics con Google Analytics
4. Configurar notificaciones de deployment
5. Implementar feature flags