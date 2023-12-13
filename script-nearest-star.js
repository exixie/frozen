class Star {
	constructor(constellation){
		this.const = constellation
		this.size = Math.floor(Math.random() * 15 + 5)
		this.x =    Math.floor(Math.random() * (this.const.xmax - this.size))
		this.y =    Math.floor(Math.random() * (this.const.ymax - this.size))
		this.vx =   Math.random() / 2 - 0.25
		this.vy =   Math.random() / 2 - 0.25
	}
	
	render(ctx){
		ctx.fillRect(this.x, this.y, this.size, this.size)
	}
	
	update(){
		if (this.x < 0 || this.x > this.const.xmax-this.size) this.vx *=-1	
		this.x += this.vx
		
		if (this.y < 0 || this.y > this.const.ymax-this.size) this.vy *=-1 
		this.y += this.vy
	}
	
}

class Constellation{
	constructor(size, ctx, xmax, ymax){
		this.size = size
		this.xmax = xmax
		this.ymax = ymax
		this.ctx = ctx
		
		this.stars = new Array(this.size).fill().map(() => new Star(this))
	}
	
	render(){
		for(let i = 0; i < this.size; i++) this.stars[i].render(this.ctx)
	}
	
	update(){
		for(let i = 0; i < this.size; i++) {
			this.stars[i].update()
			let mindist = this.xmax**2 + this.ymax**2
			let best = -1
			for (let j = 0; j < this.size; j++){
				let d = this.getDistance(i, j)
				if (d < mindist && i != j){
					mindist = d
					best = j
				}
			}
			this.ctx.beginPath()
	 		this.ctx.moveTo(this.stars[i].x + this.stars[i].size/2, this.stars[i].y + this.stars[i].size/2)
	 		this.ctx.lineTo(this.stars[best].x + this.stars[best].size/2, this.stars[best].y + this.stars[best].size/2)
	 		this.ctx.stroke()
			
		}
	}
	
	getDistance(i1, i2){
		return (this.stars[i1].x - this.stars[i2].x)**2 + (this.stars[i1].y - this.stars[i2].y)**2
	}
}
		

class Screen {

	constructor(width, height){
		this.xmax = width
		this.ymax = height
		
		this.canvas = document.createElement('canvas')
		this.canvas.style.margin='0px'
		
		this.canvas.width = this.xmax
		this.canvas.height = this.ymax
		document.body.appendChild(this.canvas)
		this.ctx = document.getElementsByTagName('canvas')[0].getContext('2d')	
		this.ctx.fillStyle='white'
		this.ctx.strokeStyle='white'
		
		this.stars = new Constellation(100, this.ctx, this.xmax, this.ymax)
	}
	
	 render() {
	 	this.ctx.clearRect(0, 0, this.xmax, this.ymax)
	 	this.stars.render()
	 }
	 
	 update() {
	 	this.stars.update()
	 }
}


let main = function(){
	let scene = new Screen(window.innerWidth, window.innerHeight)
	setInterval(() => {scene.render(); scene.update()}, 50)
}

window.onload = main



