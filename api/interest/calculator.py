<script>
function calcDep(){
  const amt = parseFloat(document.getElementById('depAmt').value||0);
  const boosted = amt*1.7;
  const proj30 = amt*Math.pow(1.7,30);
  document.getElementById('calcOut').innerHTML =
    `Boosted (70%): $${boosted.toFixed(2)}<br>Locked: 200 years (backend)<br>30y preview: $${proj30.toExponential(2)}`;
}
</script>
