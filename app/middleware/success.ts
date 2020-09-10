
class HttpSuccess {
  public errorCode: number
  public status: number
  public msg: string
  public data: any

  constructor(data: any, msg: string = '', errorCode: number = 0, status:number = 200) {
    this.errorCode = errorCode
    this.status = status
    this.msg = msg
    this.data = data
  }
}
export default HttpSuccess;
