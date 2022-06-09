class MutualFund {
  constructor(
    fund,
    category,
    launch,
    crisil,
    assetSize,
    $1yr,
    $3yr,
    $5yr,
    risk,
    expenseRatio,
    sharpRatio,
    sortinoRatio,
    alpha,
    beta,
    stdDev
  ) {
    this.fund = fund;
    this.category = category;
    this.launch = launch;
    this.crisil = crisil;
    this.assetSize = assetSize;
    this.$1yr = $1yr;
    this.$3yr = $3yr;
    this.$5yr = $5yr;
    this.risk = risk;
    this.expenseRatio = expenseRatio;
    this.sharpRatio = sharpRatio;
    this.sortinoRatio = sortinoRatio;
    this.alpha = alpha;
    this.beta = beta;
    this.stdDev = stdDev;

    return;
  }
}

module.exports = MutualFund;
