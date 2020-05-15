mat2 Rot(float a) {
	float s = sin(a), c = cos(a);
    return mat2(c,-s,s,c);
}

float Star(vec2 uv, float flare) {
	float d = length(uv);
    float m = .05/d;
    
    float ray = max(0., 1.-abs(uv.x*uv.y*1000.));
    m += ray*flare;
    
    uv *= Rot(3.1415/4.);
    
    ray = max(0., 1.-abs(uv.x*uv.y*1000.));
    m += ray*flare;
    return m;
}

float Hash21(vec2 p) {
	p = fract(p*vec2(123.34,456.21));
    p += dot(p,p+45.32);
    return fract(p.x*p.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord-0.5*iResolution.xy)/iResolution.y;
    uv *= 3.;

    // Time varying pixel color
    vec3 col = vec3(0);
    
    vec2 gv = fract(uv)-.5;
    vec2 id = floor(uv);
    
    for(int y=-1;y<=1;y++) {
        for(int x=-1;x<=1;x++) {
            vec2 offs = vec2(x,y);
            
            
        	float n = Hash21(id+offs);
            col += Star(gv-offs-(vec2(n,fract(n*34.))-0.5), 1.); 
            
        }
    }
    
    
    
    
    // if(gv.x>.48 || gv.y>.48) col.r = 1.;
    
    
    // col += Hash21(id);
    // col.rg += id*.5;
    // Output to screen
    fragColor = vec4(col,1.0);
}
