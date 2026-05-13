/* THE MAGICK MECHANIC - ORACLE CARD READER */

/* CSS STYLES */
const styles = `
  .oracle-reader {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Darker Grotesque', sans-serif;
    background: linear-gradient(135deg, #071037 0%, #161719 50%, #4A0401 100%);
    min-height: 100vh;
    color: #FEF7F2;
  }

  .oracle-header {
    text-align: center;
    margin-bottom: 40px;
    padding: 40px 20px;
  }

  .oracle-header h1 {
    font-family: 'Rasputin', serif;
    font-size: 3.5em;
    color: #FFEE86;
    margin: 0;
    letter-spacing: 4px;
    text-transform: uppercase;
  }

  .oracle-header p {
    font-family: 'Polarity Light', sans-serif;
    font-size: 1.3em;
    color: #A1EBE4;
    margin-top: 15px;
    letter-spacing: 1.11px;
  }

  .reading-types {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .reading-type-btn {
    background: transparent;
    border: 2px solid #C79535;
    color: #FEF7F2;
    padding: 15px 30px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;
  }

  .reading-type-btn:hover {
    background: #C79535;
    color: #020202;
    transform: translateY(-2px);
  }

  .reading-type-btn.active {
    background: #C79535;
    color: #020202;
  }

  .cards-container {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin: 40px 0;
    min-height: 500px;
  }

  .card {
    background: #161719;
    border: 3px solid #C79535;
    border-radius: 12px;
    padding: 20px;
    width: 280px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(199, 149, 53, 0.3);
  }

  .card img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .card-title {
    font-family: 'Rasputin', serif;
    font-size: 1.8em;
    color: #FFEE86;
    margin: 10px 0;
    letter-spacing: 0.44px;
  }

  .card-position {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 0.9em;
    color: #C79535;
    text-transform: uppercase;
    letter-spacing: 0.44px;
    margin-bottom: 10px;
  }

  .card-message {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    color: #FEF7F2;
    line-height: 1.6;
    letter-spacing: 0.25px;
  }

  .draw-button {
    display: block;
    margin: 40px auto;
    padding: 20px 50px;
    background: #C79535;
    color: #020202;
    border: none;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.3em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .draw-button:hover {
    background: #FFEE86;
    transform: scale(1.05);
  }

  .email-section {
    background: rgba(22, 23, 25, 0.8);
    border: 2px solid #C79535;
    border-radius: 12px;
    padding: 40px;
    max-width: 600px;
    margin: 60px auto;
    text-align: center;
  }

  .email-section h2 {
    font-family: 'Rasputin', serif;
    font-size: 2.2em;
    color: #FFEE86;
    margin-bottom: 15px;
    letter-spacing: 0.44px;
  }

  .email-section p {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.2em;
    color: #FEF7F2;
    margin-bottom: 25px;
    letter-spacing: 0.25px;
  }

  .email-form {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }

  .email-input {
    padding: 15px;
    border: 2px solid #C79535;
    border-radius: 8px;
    background: #020202;
    color: #FEF7F2;
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
  }

  .email-input:focus {
    outline: none;
    border-color: #FFEE86;
  }

  .email-submit {
    padding: 15px 30px;
    background: #C79535;
    color: #020202;
    border: none;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1.1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .email-submit:hover {
    background: #FFEE86;
  }

  .email-success {
    color: #A1EBE4;
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    margin-top: 15px;
  }

  .social-sharing {
    background: rgba(22, 23, 25, 0.8);
    border: 2px solid #C79535;
    border-radius: 12px;
    padding: 40px;
    max-width: 600px;
    margin: 40px auto;
    text-align: center;
  }

  .social-sharing h3 {
    font-family: 'Rasputin', serif;
    font-size: 2em;
    color: #FFEE86;
    margin-bottom: 15px;
    letter-spacing: 0.44px;
  }

  .social-sharing p {
    font-family: 'Darker Grotesque', sans-serif;
    font-size: 1.1em;
    color: #FEF7F2;
    margin-bottom: 25px;
    letter-spacing: 0.25px;
  }

  .social-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-btn {
    padding: 12px 24px;
    border: 2px solid #FEF7F2;
    background: transparent;
    color: #FEF7F2;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1em;
    letter-spacing: 0.44px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .social-btn:hover {
    background: #FEF7F2;
    color: #020202;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .oracle-header h1 {
      font-size: 2.5em;
    }
    .card {
      width: 100%;
      max-width: 350px;
    }
    .reading-types {
      flex-direction: column;
      align-items: center;
    }
    .reading-type-btn {
      width: 100%;
      max-width: 300px;
    }
    .email-section, .social-sharing {
      padding: 25px;
    }
    .social-buttons {
      flex-direction: column;
      align-items: center;
    }
    .social-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }
`;

/* SOCIAL SHARING FUNCTIONS - Must be defined before OracleCardReader */

// Generate branded share image with card + logos
async function generateShareImage(readingTitle, cards, positions) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1350;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#071037');
    gradient.addColorStop(0.5, '#161719');
    gradient.addColorStop(1, '#4A0401');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Gold border
    ctx.strokeStyle = '#C79535';
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    // Base64 logos - TheMagickMechanic.com URL logo
    const logoURL = 'data:image/png;base64,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rv0wTP4O2P6Ztv/v3Pgb/f/9+l72fe9zJ/d9L56uXfO/16P3af7/f9vrT+9H/P/P/etcfK+e1r3R/9u3//f96H+0P/3s+pXl//6LX3sN+Ge/V9u/X9f+9z9a32z7wbzx+u/PG7/y72z/vu9++Zv/++f/9Yv0/+2f/t+fP/k3r1/719b+7Xvtm7/51u033vz1t65e2P03Xvv+2//+6rXXvn3127d/fvv/73l8/P+d21//7Z/c/TvS/veS/Z/P/r8Rd/8Pzn9fz/8/EHP+P1d5/mPN/9cPz9P/g9u/Y5u/p6v3/+c/9Jbv0z+VfK/+J+Tlf8vm/9vn/Pv3z1pf/j7cvr75+77aw38Wlv95O/X7e3Kt6+//tf9e+X/n+e/1fPt/Zv/9mf/v2P+3lud/z7N/P2//9z73v3+z/fp/+3t0+v/m+e/7+v9v+d+b/3cv/3dv/x1e/t+9/f/H9v/exX/vlv/+Yn4P5vdh+X9/+d+f/z4u//t39qdh++/P2t+19f+v3v77bvfT/5+Y+f/pze+r7f/u/L838/+T2/+9+f/33X/Pze/L/u/Q/f/3n/t69My6c+efuf3/5uZ/50W3/8uL/72f//dt/d/avnrjr9b8//cN/+d+7zf1af/nvfD+39Gn/TvGp/2ef37te/E/XjduZP/dfMbTd+j+b//q/88L/2nt/+5v/u/s/z/u/h7Mf8/+t/cX6nP+72z/bm3//d1/Pq/+e4tn/n88+/fn/t//m/y/wdnmv083fb1Y/vtX77f938d/z1Z/D/jkk+3fwdfD/kY9+vf6k/Vn/8v96H9b79fl//v7v99tDjv/Otv89/Gev/v7r4+vPvk/trwe9t/GG9/j3X//Lbf/s/r6sz9fPPna/u/1G+Vt/54n/07Nr7//z8v8v/+i+e/7+f/bN/j9mf+bq/+dVz95fVv+d/bmf+vR2/fv/PX1+jP/28v/TvPq//byO3PT+++Z9+/dv8ef/dqy/+/M/8/O/l+a/39b/j5d/f1Y/ndv/zu7/2+d+X+3y//y/t+4+X/1+O/hyd/v5X/98v+bu/+7d+y/9/g/e2f/Hdrz/7pz//9f0+PX1+z/z61bv1u7f+Pef1/s/ltPfufv/Pf17v+u5f8v3f/7Tv83P/vvnv//P/tvu/Y9P/PfN/J/v+y/y/7f6eW//bf+Xl/8Pzr7P5P+v33u/4X1/73P/t+5/zcv/3cd/b+3u/fT/+v7f3T7c8K3/wf1yf/N3X//k/+3t38fd3+/z/veuPPfd/yf5Zv/Pdfvx+7r6fnfw+v/mZv+fjxY/X1Ze39Xe/8Hn/xvu/N77u56f93we3bT//2b/+7VP0f3//3e/P7f/m95/p+h+e/L7f+u5d/j5b+x/O/c/p+5+f+z5e/p+b/PN//9R//59f/us7+vpfy9/Ic///nPj/6bcxbDEgAAQKYv7j9wuqhk2Xp86SfHvYNIl41L7X+dpgMi3gAAAO0Q8Qag6Xe5hmdpS8MjzZS/D/jqjStlKH8/Vn52RaO+ev0eXnnj1+tuXPl/u/Kty7d9v6vfqf3bt/8T8eY5o8PhHv/YqSUAAAC6INoNwO0poT/98M+nh1ePZMl3wwNHh//PBn/i0+bfl/17eNmJpdV/Dz/77MUW/L0r+6g3zzEqPe5xW+tbAAACJUlEQVTJ9/8xftECAAAAjiDa3daTL/x8+/Oe6o21i/Sf89s1VFz+E7P+uPT60jHE21/+OBFvc/L+DhXxfrBfjze/59Yj3qLdAAAA7RLt7s0f/mJcAqBhP56ez8t8v/tfvO/+xfvxG/99H1x/c+XN6++5vvjq8Z+++N61P36eb/vma/d89u4f3+fyH19p/J/8xNKM6zftcVrpME9d2wAAAFom2t3UU87P+vHz/Px18v9YPrwYX9Z/aP14+t6Pf+/u1V+UcSqp/L1Y/tFLH/zCn+qwJNrdin1t/1dnP/oCAAAgjWh3e78IjsWy/vzqf/KLD1+O+qPPGAf+wQ8PpziZcenWy//0JRNX6l+vl++T8Q8m0W4AAIC+iHYn+PWnJR+9+vA1/vlHJ/7p0pz+p+OHIt5O+vS9Yumox+9/ePQ//Vy0+x//+fgP9jww/e9/Mv76/u6HH03/84P/Mv1x/zOkF/5f8vDbP/vn2+9V6tvu6x97Ie+v33p0+b/v+r/1/m/+98k/u1J+nfsvH/9Wf+30cvH5p5+5kn3z1G99fN2r05/85OP7v1CL//xPfz/99IPv5/8c9N//H/Pf/3j4r/93AAAAIABJREFU//gf//n0X/7r//Pp7p/Dv0ej7nL/1+U/PfqP7v4h/Hd///e///9tNpv/v+N/+PLf+PSnP5F++Vf+xfSzX7z+3D/zjv/4wnP/+3///Ev/Uv7f/3/95u+3/Xee7/8P//r//Ol/+/9k+qf//j1Z/e9/9t+BNz75z8Kff+WXzvz/y+/8/Q+a/+e+9Ktfufx/u+P/O+//+l+f/2cBAAAALZj/l4Nd/v0v//3PP/2ZP78c5f79j/72Dz8Z0P705z+f9qeFnvm3vuuxx/zoz/7hFf/Ws//O7z/3z/z0T/9B/uerp//kl37p5K8H+/+uK//aP/5vT//oe8f/u+//4rV/6v/+f/7b/wYAANCq/wfjKlCh/wtriwAAAABJRU5ErkJggg==';
    
    // Base64 logos - MW flatgold mark
    const logoMW = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABh0AAACQCAYAAAAcCKpKAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAACWAAAAAQAAAJYAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAABh2gAwAEAAAAAQAAAJAAAAAA6yeoHQAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHtnV1y3Da2h4nWh/0mzwrcs4LoVo1dY8+DOiuIZgVuP06cKSsrsLyCKDVx5tGdFYyygrQeJp6yUzWdFVx5Bdd6syWrcc8ByW52N0kc8BNs/lllq0mAwMEPIHCAg48gwAUCIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACIAACfCSg+pjoptP871cPDgeBOi4U73w+ffT336aF3sVLIAACIAACIAACXhF4888/D4P5fFxIKOgEhbDhJRAAARBgAuiToRyAAAiAAAiAAAiAQHMEdpuL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/J1q5f/7sv/bvf8P2/0P/v8X/f+N///L/Pfv+v/H//87+Q+Q9v//2ff/P/t/vvz/LP2/z+f+u1b/u/b/Z/n/vu7/5fn/bv////j/Wf8/uv/v+P/F/P/08//a/n+A/5f4/+Wd+89c/3+t/f+g+h+J/+9K/63s/2b+f/H9b9P/59v/D/h/+fz/0/Y/Fv3/2vp/2/1/Iv1v+P819v8P5v+r9/83//+D/X+6//e//OdT/Z96/v/k//f6f2U/Af4/6P+j/j9R/y+4/f/E/F/2/8z+/y/u/7/h/5/+P+j//+r+X9v/Gy/+f/n/8X94V/2f+v67zXP/f8L/d9v/f+7/l/H/Jvzf2fyfdvh/gP/fnv+/sfcf6/8P//+Z///N/6e3/P+9+v9z/r/i9+zs/2+6/w/6/0r/i/z/xvb/Zv1/hv+f4v+//v/T/H/9+3X1/7ef/59Z/79X/r+g/2+d/r/+U/6/Vvk/6f+Z+//B/l/b/7/F//Pr/4Ny+1/Y/yt//1b4n/3/Pf/P+//i/7v3/6X8/6j+f+/+//j/jvz/fv8/uv//xfV//L/9qv/ft/v/3P/33f/9/dHv3/P/9vf/2v3H/n9f/P++/3/e/l/b+/sX/j+p/x/S/3fr/x/3/1/t/2/v/xP+/xv+P7v+z/3/k+v/w/m/yf9/z/uv0v+J/T/U/zfX/7//d/X/U//7cP7/Zf//lP+n+v9D///t/fv1/5v0v/f+f93/r+3/L/f/Iv8PB/nP0tX+X+p/z/b//f8/V///7fV/4v+19/8L+T/Q/6/8u1PL/6n+/2/wf+H/09b+f3/+f+j/h+//F+3///V/p+f/K/v/zv9H+3/i/4f/n93/D/b/B/f/R/f/Svvv/b//BvX/3v57n/+nbv9f+f+/w++/+/vv5/7/rv4/3v+byf9vqv8f+/8p/l/q/8fv/9v7fzP/r/v/uf5f/P8o/0f8v+X/gf23xP8P/t/M/wf8/xv9fxz/y/r/+fxv+v9m/S/+h/v/L/j/f/+/0v99of+/6f/P+//S/v/A/g/yz+v//f/+eO/+v3X/f9P/b/f/B/d/av0n/b/G/99L//8e/g/9/wr+c2v/b7b/39r/+/l/9v/V/zdd+v+//D/Qv2vf/zf6/zj//53/d/i/+P/x/tOJ/7/1f//9/57d/3f7/3r/n/z/+/7/2+n/x/v/Bvp/2//P/WfVg+f7T//q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';
    
    // Track image loading
    let imagesLoaded = 0;
    const totalImages = 3; // card + 2 logos
    
    function checkComplete() {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        canvas.toBlob((blob) => resolve({blob, canvas}), 'image/png', 0.95);
      }
    }
    
    // Load card image
    const cardImg = new Image();
    cardImg.crossOrigin = 'anonymous';
    
    cardImg.onload = () => {
      const imgWidth = 400;
      const imgHeight = (cardImg.height / cardImg.width) * imgWidth;
      const imgX = (canvas.width - imgWidth) / 2;
      const imgY = 80;
      
      ctx.drawImage(cardImg, imgX, imgY, imgWidth, imgHeight);
      
      // Card name
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 52px serif';
      ctx.textAlign = 'center';
      ctx.fillText(cards[0].title.toUpperCase(), canvas.width / 2, imgY + imgHeight + 60);
      
      // Reading type
      ctx.fillStyle = '#FEF7F2';
      ctx.font = 'italic 28px serif';
      ctx.fillText(`In Their ${readingTitle}`, canvas.width / 2, imgY + imgHeight + 110);
      
      // Position
      ctx.fillStyle = '#C79535';
      ctx.font = '600 24px sans-serif';
      ctx.fillText(positions[0].title.toUpperCase(), canvas.width / 2, imgY + imgHeight + 150);
      
      // CTA
      const ctaY = canvas.height - 280;
      ctx.fillStyle = '#A1EBE4';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('Click to see what you get', canvas.width / 2, ctaY);
      ctx.fillText('and the guidance ✨', canvas.width / 2, ctaY + 50);
      
      // Branding
      const bottomY = canvas.height - 160;
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 42px serif';
      ctx.fillText('THE MAGICK MECHANIC', canvas.width / 2, bottomY);
      
      checkComplete();
    };
    
    cardImg.onerror = () => {
      // Text fallback
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 48px serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOMEONE GOT', canvas.width / 2, 200);
      
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 64px serif';
      ctx.fillText(cards[0].title.toUpperCase(), canvas.width / 2, 300);
      
      ctx.fillStyle = '#FEF7F2';
      ctx.font = 'italic 36px serif';
      ctx.fillText(`In Their ${readingTitle}`, canvas.width / 2, 370);
      
      ctx.fillStyle = '#C79535';
      ctx.font = '600 28px sans-serif';
      ctx.fillText(positions[0].title.toUpperCase(), canvas.width / 2, 430);
      
      const ctaY = canvas.height - 280;
      ctx.fillStyle = '#A1EBE4';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('Click to see what you get', canvas.width / 2, ctaY);
      ctx.fillText('and the guidance ✨', canvas.width / 2, ctaY + 50);
      
      const bottomY = canvas.height - 160;
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 42px serif';
      ctx.fillText('THE MAGICK MECHANIC', canvas.width / 2, bottomY);
      
      checkComplete();
    };
    
    // Load MW logo (bottom-left)
    const mwImg = new Image();
    mwImg.onload = () => {
      const logoSize = 60;
      const logoY = canvas.height - 90;
      ctx.drawImage(mwImg, 80, logoY, logoSize, logoSize);
      checkComplete();
    };
    mwImg.onerror = () => {
      ctx.fillStyle = '#C79535';
      ctx.font = 'bold 28px serif';
      ctx.textAlign = 'left';
      ctx.fillText('M✕W', 80, canvas.height - 50);
      checkComplete();
    };
    mwImg.src = logoMW;
    
    // Load URL logo (bottom-right)
    const urlImg = new Image();
    urlImg.onload = () => {
      const logoWidth = 280;
      const logoHeight = (urlImg.height / urlImg.width) * logoWidth;
      const logoY = canvas.height - 80;
      ctx.drawImage(urlImg, canvas.width - logoWidth - 80, logoY, logoWidth, logoHeight);
      checkComplete();
    };
    urlImg.onerror = () => {
      ctx.fillStyle = '#FFEE86';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('TheMagickMechanic.com', canvas.width - 80, canvas.height - 50);
      checkComplete();
    };
    urlImg.src = logoURL;
    
    // Start loading card image
    cardImg.src = cards[0].image_url;
  });
}

// Instagram share: download image + copy caption
async function shareToInstagram(readingTitle, cards, positions) {
  const {blob} = await generateShareImage(readingTitle, cards, positions);
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'oracle-reading-instagram.png';
  a.click();
  URL.revokeObjectURL(url);
  
  const caption = `Someone got ${cards[0].title} in their ${readingTitle}. Click to see what you get and the guidance! ✨`;
  await navigator.clipboard.writeText(caption);
  
  alert('Image downloaded! Caption copied to clipboard. Now post to Instagram Stories!');
}

// TikTok share: download image + copy caption
async function shareToTikTok(readingTitle, cards, positions) {
  const {blob} = await generateShareImage(readingTitle, cards, positions);
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'oracle-reading-tiktok.png';
  a.click();
  URL.revokeObjectURL(url);
  
  const caption = `Someone got ${cards[0].title} in their ${readingTitle}. Click to see what you get and the guidance! ✨`;
  await navigator.clipboard.writeText(caption);
  
  alert('Image downloaded! Caption copied to clipboard. Now post to TikTok!');
}

// Facebook share: open native share
function shareToFacebook(readingTitle, cards) {
  const text = `Someone got ${cards[0].title} in their ${readingTitle}. Click to see what you get and the guidance! ✨`;
  const url = window.location.href;
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
}

// Twitter share: open native share
function shareToTwitter(readingTitle, cards) {
  const text = `Someone got ${cards[0].title} in their ${readingTitle}. Click to see what you get and the guidance! ✨`;
  const url = window.location.href;
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

// Threads share: open native share
function shareToThreads(readingTitle, cards) {
  const text = `Someone got ${cards[0].title} in their ${readingTitle}. Click to see what you get and the guidance! ✨`;
  const url = window.location.href;
  window.open(`https://threads.net/intent/post?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
}

/* MAIN ORACLE CARD READER FUNCTION */

function OracleCardReader() {
  // Reading types with positions
  const readingTypes = {
    single: {
      name: 'Single Card Reading',
      positions: [
        { title: 'Your Guidance', description: 'What you need to know right now' }
      ]
    },
    past_present_future: {
      name: 'Past, Present, Future',
      positions: [
        { title: 'Past', description: 'Where you\\'ve been' },
        { title: 'Present', description: 'Where you are now' },
        { title: 'Future', description: 'Where you\\'re headed' }
      ]
    },
    situation_action_outcome: {
      name: 'Situation, Action, Outcome',
      positions: [
        { title: 'Situation', description: 'What\\'s happening' },
        { title: 'Action', description: 'What to do' },
        { title: 'Outcome', description: 'Where it leads' }
      ]
    }
  };

  // Oracle deck
  const cards = [
    {
      id: 1,
      title: 'The Beauty',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882825434-L63IQFFQRNYXWAJQQ3CW/The+Beauty.jpg',
      message: 'Recognize and honor the inherent beauty within yourself and the world around you.'
    },
    {
      id: 2,
      title: 'The Protector',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882845090-Z8JJV0R8C1SQDJN1UQZB/The+Protector.jpg',
      message: 'Stand as a guardian for what matters most. Set boundaries and defend your sacred space.'
    },
    {
      id: 3,
      title: 'The Trickster',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882867333-02XODXIDSJGZ7CNFXVKV/The+Trickster.jpg',
      message: 'Embrace playfulness and see beyond illusions. Question assumptions and find wisdom in paradox.'
    },
    {
      id: 4,
      title: 'The Mystic',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882889442-YDQELXNBHM7OY7HBFK4R/The+Mystic.jpg',
      message: 'Trust your intuition and inner knowing. The answers you seek are within.'
    },
    {
      id: 5,
      title: 'The Lover',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882908764-XOQT1S1I38HVWJ67EFMG/The+Lover.jpg',
      message: 'Open your heart fully. Love and connection are your greatest strengths.'
    },
    {
      id: 6,
      title: 'The Healer',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882929219-7UMRN3Z5VJKWZ3GG9UYE/The+Healer.jpg',
      message: 'Embrace your power to restore and renew. Healing begins with compassion.'
    },
    {
      id: 7,
      title: 'The Shadow',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882949603-DLAJZXWBJ2GCTW1HY7QG/The+Shadow.jpg',
      message: 'Face what you\\'ve been avoiding. Integration of shadow brings wholeness.'
    },
    {
      id: 8,
      title: 'The Warrior',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882970691-6HSTG0HYFJ30WT0L2R6R/The+Warrior.jpg',
      message: 'Stand in your power with courage and conviction. Fight for what truly matters.'
    },
    {
      id: 9,
      title: 'The Innocent',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719882990235-76WS38Q5DS5XVLQHF7RS/The+Innocent.jpg',
      message: 'See the world with fresh eyes. Purity of intention opens new possibilities.'
    },
    {
      id: 10,
      title: 'The Sage',
      image_url: 'https://images.squarespace-cdn.com/content/v1/5ff88ec5adf2f72a62aea04d/1719883010907-EEYU5G1L9Z7P4ZU4KTVH/The+Sage.jpg',
      message: 'Step back and observe. Wisdom comes from perspective and patience.'
    }
  ];

  let currentReadingType = 'single';
  let drawnCards = [];

  function init() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.className = 'oracle-reader';
    container.innerHTML = `
      <div class="oracle-header">
        <h1>Oracle Card Reader</h1>
        <p>Choose your reading type and draw your cards</p>
      </div>

      <div class="reading-types">
        <button class="reading-type-btn active" data-type="single">Single Card</button>
        <button class="reading-type-btn" data-type="past_present_future">Past, Present, Future</button>
        <button class="reading-type-btn" data-type="situation_action_outcome">Situation, Action, Outcome</button>
      </div>

      <button class="draw-button">Draw Cards</button>

      <div class="cards-container"></div>

      <div class="email-section" style="display: none;">
        <h2>Want Your Full Reading Sent?</h2>
        <p>Enter your email and we'll send you the complete reading with detailed guidance.</p>
        <form class="email-form">
          <input type="email" class="email-input" placeholder="your@email.com" required>
          <button type="submit" class="email-submit">Send My Reading</button>
        </form>
        <div class="email-success" style="display: none;">✓ Reading sent! Check your inbox.</div>
      </div>

      <div class="social-sharing" style="display: none;">
        <h3>Share Your Reading</h3>
        <p>Let others discover what guidance awaits them!</p>
        <div class="social-buttons">
          <button class="social-btn instagram-btn">
            <span>📸</span> Instagram
          </button>
          <button class="social-btn tiktok-btn">
            <span>🎵</span> TikTok
          </button>
          <button class="social-btn facebook-btn">
            <span>📘</span> Facebook
          </button>
          <button class="social-btn twitter-btn">
            <span>🐦</span> Twitter
          </button>
          <button class="social-btn threads-btn">
            <span>🧵</span> Threads
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);
    attachEventListeners();
  }

  function attachEventListeners() {
    document.querySelectorAll('.reading-type-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.reading-type-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentReadingType = e.target.dataset.type;
        document.querySelector('.cards-container').innerHTML = '';
        document.querySelector('.email-section').style.display = 'none';
        document.querySelector('.social-sharing').style.display = 'none';
      });
    });

    document.querySelector('.draw-button').addEventListener('click', drawCards);
    document.querySelector('.email-form').addEventListener('submit', handleEmailSubmit);

    document.querySelector('.instagram-btn').addEventListener('click', () => {
      shareToInstagram(
        readingTypes[currentReadingType].name,
        drawnCards,
        readingTypes[currentReadingType].positions
      );
    });

    document.querySelector('.tiktok-btn').addEventListener('click', () => {
      shareToTikTok(
        readingTypes[currentReadingType].name,
        drawnCards,
        readingTypes[currentReadingType].positions
      );
    });

    document.querySelector('.facebook-btn').addEventListener('click', () => {
      shareToFacebook(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });

    document.querySelector('.twitter-btn').addEventListener('click', () => {
      shareToTwitter(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });

    document.querySelector('.threads-btn').addEventListener('click', () => {
      shareToThreads(
        readingTypes[currentReadingType].name,
        drawnCards
      );
    });
  }

  function drawCards() {
    const reading = readingTypes[currentReadingType];
    const numCards = reading.positions.length;

    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    drawnCards = shuffled.slice(0, numCards);

    displayCards(drawnCards, reading.positions);

    document.querySelector('.email-section').style.display = 'block';
    document.querySelector('.social-sharing').style.display = 'block';
  }

  function displayCards(selectedCards, positions) {
    const container = document.querySelector('.cards-container');
    container.innerHTML = '';

    selectedCards.forEach((card, index) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card';
      cardEl.innerHTML = `
        <img src="${card.image_url}" alt="${card.title}">
        <div class="card-position">${positions[index].title}</div>
        <div class="card-title">${card.title}</div>
        <div class="card-message">${card.message}</div>
      `;
      container.appendChild(cardEl);
    });
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    
    const email = document.querySelector('.email-input').value;
    const reading = readingTypes[currentReadingType];

    try {
      const response = await fetch('https://api.mailjet.com/v3.1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('YOUR_API_KEY:YOUR_SECRET_KEY')
        },
        body: JSON.stringify({
          Messages: [{
            From: { Email: 'noreply@themagickmechanic.com', Name: 'The Magick Mechanic' },
            To: [{ Email: email }],
            Subject: `Your ${reading.name} Reading`,
            TextPart: `Your oracle reading:\\n\\n${drawnCards.map((card, i) => 
              `${reading.positions[i].title}: ${card.title}\\n${card.message}`
            ).join('\\n\\n')}`,
            HTMLPart: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #C79535;">Your ${reading.name}</h2>
                ${drawnCards.map((card, i) => `
                  <div style="margin: 30px 0; border-left: 3px solid #C79535; padding-left: 15px;">
                    <h3 style="color: #071037;">${reading.positions[i].title}</h3>
                    <h4 style="color: #FFEE86;">${card.title}</h4>
                    <p style="color: #161719;">${card.message}</p>
                  </div>
                `).join('')}
              </div>
            `
          }]
        })
      });

      if (response.ok) {
        document.querySelector('.email-form').style.display = 'none';
        document.querySelector('.email-success').style.display = 'block';
      }
    } catch (error) {
      console.error('Email send failed:', error);
      alert('Failed to send email. Please try again.');
    }
  }

  init();
}

/* INITIALIZE */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', OracleCardReader);
} else {
  OracleCardReader();
}
