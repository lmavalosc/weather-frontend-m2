const LOCATIONS = [
  {id:'madrid', name:'Madrid, ES', temp:22, state:'Soleado', icon:'☀️', humidity:40, wind:12, forecast:[]},
  {id:'barcelona', name:'Barcelona, ES', temp:19, state:'Parcialmente nublado', icon:'⛅', humidity:55, wind:10, forecast:[]},
  {id:'newyork', name:'New York, US', temp:15, state:'Lluvias', icon:'🌧️', humidity:70, wind:20, forecast:[]},
  {id:'sydney', name:'Sydney, AU', temp:25, state:'Soleado', icon:'☀️', humidity:50, wind:14, forecast:[]},
  {id:'tokyo', name:'Tokyo, JP', temp:18, state:'Nublado', icon:'☁️', humidity:60, wind:9, forecast:[]},
  {id:'cairo', name:'Cairo, EG', temp:31, state:'Caluroso', icon:'🔥', humidity:20, wind:8, forecast:[]},
  {id:'buenosaires', name:'Buenos Aires, AR', temp:17, state:'Brisa', icon:'🌬️', humidity:68, wind:11, forecast:[]},
  {id:'london', name:'London, UK', temp:12, state:'Lluvia ligera', icon:'🌧️', humidity:75, wind:13, forecast:[]},
  {id:'moscow', name:'Moscow, RU', temp:5, state:'Nieve', icon:'❄️', humidity:80, wind:18, forecast:[]},
  {id:'santiago', name:'Santiago, CL', temp:14, state:'Parcial', icon:'⛅', humidity:58, wind:10, forecast:[]}
];

function generateForecastFor(location){
  const days = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const today = new Date().getDay();
  const list = [];
  for(let i=0;i<7;i++){
    const dayIndex = (today + i) % 7;
    const tempVariation = Math.round((Math.random()*6)-3);
    list.push({day:days[dayIndex], temp: location.temp + tempVariation, icon: ['☀️','⛅','🌧️','❄️'][Math.floor(Math.random()*4)]});
  }
  return list;
}

// Populate forecast arrays once
LOCATIONS.forEach(loc => { loc.forecast = generateForecastFor(loc); });

function renderGrid(){
  const container = document.getElementById('locationsGrid');
  if(!container) return;
  container.innerHTML = '';
  LOCATIONS.forEach(loc =>{
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <article class="card card-weather h-100">
        <div class="card-body d-flex flex-column">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div>
              <h5 class="card-title mb-0">${loc.name}</h5>
              <small class="text-muted">${loc.state}</small>
            </div>
            <div class="text-end">
              <div class="weather-icon">${loc.icon}</div>
              <div class="fs-5">${loc.temp}°C</div>
            </div>
          </div>
          <div class="mt-auto">
            <a href="detail.html?id=${loc.id}" class="stretched-link btn btn-sm btn-primary">Ver detalle</a>
          </div>
        </div>
      </article>
    `;
    container.appendChild(col);
  });
}

function renderDetail(){
  const el = document.getElementById('detailSection');
  if(!el) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const loc = LOCATIONS.find(l=>l.id===id);
  if(!loc){
    el.innerHTML = `<div class="alert alert-warning">Localidad no encontrada. <a href="index.html">Volver</a></div>`;
    return;
  }

  el.innerHTML = `
    <article class="row g-4">
      <div class="col-12 col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <div class="display-6">${loc.icon}</div>
            <h3 class="card-title">${loc.name}</h3>
            <p class="card-text fs-3">${loc.temp}°C — ${loc.state}</p>
            <ul class="list-group list-group-flush text-start">
              <li class="list-group-item">Humedad: <strong>${loc.humidity}%</strong></li>
              <li class="list-group-item">Viento: <strong>${loc.wind} km/h</strong></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <h4>Pronóstico semanal</h4>
        <div class="row g-2">
          ${loc.forecast.map(f => `
            <div class="col-6 col-sm-4 col-lg-3">
              <div class="card h-100">
                <div class="card-body text-center small">
                  <div>${f.day}</div>
                  <div class="fs-4">${f.icon}</div>
                  <div>${f.temp}°C</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </article>
  `;
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderGrid();
  renderDetail();
});
