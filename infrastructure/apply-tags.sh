#!/bin/bash
# ============================================================================
# apply-tags.sh - Aplica tags de cost allocation a los recursos AWS del proyecto
# ============================================================================
# Uso:
#   ./infrastructure/apply-tags.sh
#
# Requisitos:
#   - AWS CLI configurado con credenciales válidas
#   - Variables de entorno DEPLOY_BUCKET_NAME y DEPLOY_DISTRIBUTION_ID definidas
#     (o un archivo .env en la raíz del proyecto)
# ============================================================================

set -euo pipefail

# --- Colores para output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --- Cargar variables de entorno si existe .env ---
if [ -f .env ]; then
  echo -e "${YELLOW}Cargando variables desde .env...${NC}"
  export $(grep -v '^#' .env | xargs)
fi

# --- Validar variables requeridas ---
if [ -z "${DEPLOY_BUCKET_NAME:-}" ]; then
  echo -e "${RED}ERROR: DEPLOY_BUCKET_NAME no está definida.${NC}"
  echo "Define la variable de entorno o agrégala al archivo .env"
  exit 1
fi

if [ -z "${DEPLOY_DISTRIBUTION_ID:-}" ]; then
  echo -e "${RED}ERROR: DEPLOY_DISTRIBUTION_ID no está definida.${NC}"
  echo "Define la variable de entorno o agrégala al archivo .env"
  exit 1
fi

# --- Definir tags del proyecto ---
PROJECT="david-barrera-portafolio"
ENVIRONMENT="production"
OWNER="david-barrera"
COST_CENTER="personal-portfolio"
MANAGED_BY="github-actions"
REPOSITORY="sebasgao05/DavidBarreraDevCom"

echo "============================================"
echo " AWS Cost Allocation Tagging"
echo " Proyecto: ${PROJECT}"
echo "============================================"
echo ""

# --- 1. Etiquetar bucket S3 ---
echo -e "${YELLOW}[1/3] Aplicando tags al bucket S3: ${DEPLOY_BUCKET_NAME}${NC}"

aws s3api put-bucket-tagging \
  --bucket "${DEPLOY_BUCKET_NAME}" \
  --tagging "TagSet=[
    {Key=Project,Value=${PROJECT}},
    {Key=Environment,Value=${ENVIRONMENT}},
    {Key=Owner,Value=${OWNER}},
    {Key=CostCenter,Value=${COST_CENTER}},
    {Key=ManagedBy,Value=${MANAGED_BY}},
    {Key=Repository,Value=${REPOSITORY}}
  ]"

echo -e "${GREEN}  ✓ Bucket S3 etiquetado correctamente${NC}"

# --- 2. Obtener ARN de la distribución CloudFront ---
echo -e "${YELLOW}[2/3] Obteniendo ARN de CloudFront: ${DEPLOY_DISTRIBUTION_ID}${NC}"

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
DISTRIBUTION_ARN="arn:aws:cloudfront::${AWS_ACCOUNT_ID}:distribution/${DEPLOY_DISTRIBUTION_ID}"

echo "  ARN: ${DISTRIBUTION_ARN}"

# --- 3. Etiquetar distribución CloudFront ---
echo -e "${YELLOW}[3/3] Aplicando tags a CloudFront: ${DEPLOY_DISTRIBUTION_ID}${NC}"

aws cloudfront tag-resource \
  --resource "${DISTRIBUTION_ARN}" \
  --tags "Items=[
    {Key=Project,Value=${PROJECT}},
    {Key=Environment,Value=${ENVIRONMENT}},
    {Key=Owner,Value=${OWNER}},
    {Key=CostCenter,Value=${COST_CENTER}},
    {Key=ManagedBy,Value=${MANAGED_BY}},
    {Key=Repository,Value=${REPOSITORY}}
  ]"

echo -e "${GREEN}  ✓ Distribución CloudFront etiquetada correctamente${NC}"

# --- Verificación ---
echo ""
echo "============================================"
echo -e "${GREEN} ✓ Tags aplicados exitosamente${NC}"
echo "============================================"
echo ""
echo "Verificación:"
echo ""

echo "--- Tags del Bucket S3 ---"
aws s3api get-bucket-tagging --bucket "${DEPLOY_BUCKET_NAME}" --output table 2>/dev/null || echo "  (sin tags previos)"

echo ""
echo "--- Tags de CloudFront ---"
aws cloudfront list-tags-for-resource --resource "${DISTRIBUTION_ARN}" --output table 2>/dev/null || echo "  (sin tags previos)"

echo ""
echo "============================================"
echo " Próximos pasos:"
echo "  1. Activar Cost Allocation Tags en AWS Billing Console"
echo "  2. Esperar ~24h para que aparezcan en reportes"
echo "  3. Configurar filtros en Cost Explorer"
echo "============================================"
