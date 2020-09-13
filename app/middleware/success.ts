
class HttpSuccess {
  public code: number
  public status: number
  public msg: string
  public data: any

  constructor(data: any, msg: string = '', code: number = 0, status:number = 200) {
    this.code = code
    this.status = status
    this.msg = msg
    this.data = data
  }
}
export default { HttpSuccess };
