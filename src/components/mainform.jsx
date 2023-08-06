import React, { useState } from 'react'
import arcad from  '../task/assets/images/icon-arcade.svg'
import advanced from  '../task/assets/images/icon-advanced.svg'
import pro from  '../task/assets/images/icon-pro.svg'
import succes from '../task/assets/images/icon-thank-you.svg'

import {useForm} from 'react-hook-form'

const Mainform = () => {

  const [formSteps, setFormSteps] = useState(1)
  const [checked, setChecked] = useState("mo")
  const [online, setOnline] = useState(false)
  const [largeStore, setLargeStore] = useState(false)
  const [custom, setCustom] = useState(false)
  const [plan, setPlan] = useState(1)
  const {watch, register,handleSubmit, setValue, formState, trigger} = useForm({ mode:'all', defaultValues: { user: "", email: "", phone: "" } })
  const {errors} = formState
  

  const isValidEmail = email =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

  const emailValidator = (email) =>{
    const isValid = isValidEmail(email)
    console.log(isValid)
    if(!isValid){
      return 'the email is not valid' 
    }
    return isValid
  }

  const verifyForm = () => {
    if(formState.isDirty||watch().email !== ''){
      console.log(watch().email)
      trigger().then(()=>{
        console.log(errors)
        if(Object.keys(errors).length === 0){
          console.log('lll',formSteps)
          nextStep()
        }
      })
    }else{
      trigger()
    }
  }

  const nextStep = ()=>{
    console.log('lll',formSteps)
    if(formSteps < 5){
      setFormSteps(formSteps+1)
      console.log('lllooo')
    }
  }

  const backStep = ()=>{
    if(formSteps > 1){
      setFormSteps(formSteps-1)
    }
  }

  const confirmation = ()=>{
    setFormSteps(5)
  }
  return (
    <div className='form-block'>
      <aside>
        <div className='steps-block'>
          
          <div className='steps'>
            <i className={formSteps===1?'steps-num active':'steps-num'}>1</i>
            <div className='p-2'>
              <h3>STEP 1</h3>
              <h2>YOUR INFO</h2>
            </div>
          </div>

          <div className='steps'>
            <i className={formSteps===2?'steps-num active':'steps-num'}>2</i>
            <div className='p-2'>
              <h3>STEP 2</h3>
              <h2>SELECT PLAN</h2>
            </div>
          </div>

          <div className='steps'>
            <i className={formSteps===3?'steps-num active':'steps-num'}>3</i>
            <div className='p-2'>
              <h3>STEP 3</h3>
              <h2>ADD-ONS</h2>
            </div>
          </div>

          <div className='steps'>
            <i className={formSteps>=4?'steps-num active':'steps-num'}>4</i>
            <div className='p-2'>
              <h3>STEP 4</h3>
              <h2>SUMMARY</h2>
            </div>
          </div>

        </div>
      </aside>
      <main>
        <form onSubmit={handleSubmit(confirmation)} className={formSteps ===5?'justify-center':''}>
          {formSteps >= 1 && 
            <section className={formSteps === 1?'':'hidden'}>
              <h1>Personal info</h1>
              <p className='p-text'>Pleas provide your name, eamil, address, and phone number</p>
              <div className='inputs'>
                <div className='input-group'>
                  <label htmlFor="name" className='labelsM'>
                    <p>Name</p>
                    {errors.user && <p className='error'>{errors.user.message}</p>}
                  </label>
                  <input type="text" name="name" id="name" placeholder='e.g. Stephen King' className={errors.phone?'error':''} {...register("user",{required:"please type a username"})}/>
                </div>
                <div className='input-group'>
                  <label htmlFor="email" className='labelsM'>
                    <p>Email Address</p>
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                  </label>
                  <input type="email" name="email" id="email" placeholder='e.g. stephenking@lorem.com' className={errors.phone?'error':''} {...register("email",{required:"please type a valide email", validate:emailValidator})} />
                </div>
                <div className='input-group'>
                  <label htmlFor="phone" className='labelsM'>
                    <p>Phone Number</p> 
                    {errors.phone&&<p className='error'>{errors.phone.message}</p>}
                    </label>
                  <input type="number" name="phone" id="phone" placeholder='e.g. +1 234 567 890' className={errors.phone?'error':''} {...register("phone",{required:"this field is required"})}/>
                </div>
              </div>
            </section>
          }
          {formSteps >= 2 &&
            <section className={formSteps === 2?'':'hidden'}>
            <h1>Select your plan</h1>
            <p className='p-text'>You have the options of monthly or yearly billing</p>

            <div className='plans'>
              <div className={plan===1?'plan selected-plan':'plan'} onClick={()=>{ setValue('level','Arcad'); setPlan(1) }}>
                <input type="radio" name="level" value='Arcade' defaultChecked className='hidden' {...register("level",{required:"this field is required"})}/>
                <i><img src={arcad} alt="" /></i>
                <div>
                  <p className='title'>Arcade</p>
                  <p className='amount'>${checked === 'mo'?'9/mo':'90/yr'}</p>
                  {checked ==='yr' &&<p className='bonus'>2 month free</p>}
                </div>
              </div>
              <div className={plan===2?'plan selected-plan':'plan'} onClick={()=>{ setValue('level','Advanced'); setPlan(2) }}>
                <input type="radio" name="level" value='Advanced' className='hidden' {...register("level",{required:"this field is required"})}/>
                <i><img src={advanced} alt="" /></i>
                <div>
                  <p className='title'>Advanced</p>
                  <p className='amount'>${checked === 'mo'?'12/mo':'120/yr'}</p>
                  {checked ==='yr' &&<p className='bonus'>2 months free</p>}
                </div>
              </div>
              <div className={plan===3?'plan selected-plan':'plan'} onClick={()=>{ setValue('level','Pro'); setPlan(3) }}>
                <input type="radio" name="level" value='Pro' className='hidden' {...register("level",{required:"this field is required"})}/>
                <i><img src={pro} alt="" /></i>
                <div>
                  <p className='title'>Pro</p>
                  <p className='amount'>${checked === 'mo'?'15/mo':'150/yr'}</p>
                  {checked ==='yr' && <p className='bonus'>2 months free</p>}
                </div>
              </div>
            </div>

            <div className='period'>
              <input type='radio' name='period' value='mo' defaultChecked className='hidden' {...register("period")}/>
              <p onClick={()=>{setValue('period','mo'); setChecked('mo')}} className={checked==='yr'?'fade':''}>Monthly</p>
              <div className={checked==='mo'?'period-select':'period-select justify-end'}> <p className='dot'></p> </div>
              <p onClick={()=>{setValue('period','yr'); setChecked('yr')}} className={checked==='mo'?'fade':''}>Yearly</p>
            </div>
          </section>}
          { formSteps >= 3 &&
          <section className={formSteps === 3?'':'hidden'}>
            <h1>Pick add-ons</h1>
            <p className='p-text'>Add-ons help enhance your gaming experience.</p>
            
            <div className='addon'>
              <div className={online?'addon-item selected-plan':'addon-item'}>
                <div className='check' >
                  <input type='checkbox' name="online" id="inline" onClick={()=>setOnline(!online)}  {...register("online")}/>
                </div>
                <div className='addon-content'>
                  <h1>Online service</h1>
                  <p>Access to multiplayer games</p>
                </div>
                <div className='addon-price'>
                  {checked === 'mo' && <p>+$1/mo</p>}
                  {checked === 'yr' && <p>+$10/yr</p>}
                </div>
              </div>
              <div className={largeStore?'addon-item selected-plan':'addon-item'}>
                <div className='check'>
                  <input type='checkbox' name="largeStorage" id="inline" onClick={()=>setLargeStore(!largeStore)} {...register("largeStorage")}/>
                </div>
                <div className='addon-content'>
                  <h1>Large Storage</h1>
                  <p>Extra 1TB of cloud save</p>
                </div>
                <div className='addon-price'>
                  {checked === 'mo' && <p>+$2/mo</p>}
                  {checked === 'yr' && <p>+$20/yr</p>}
                </div>
              </div>
              <div className={custom?'addon-item selected-plan':'addon-item'}>
                <div className='check'>
                  <input type='checkbox' name="customProfile" id="inline" onClick={()=>setCustom(!custom)} {...register("customProfile")}/>
                </div>
                <div className='addon-content'>
                  <h1>Customizable Profile</h1>
                  <p>Custom theme on your profile</p>
                </div>
                <div className='addon-price'>
                  {checked === 'mo' && <p>+$2/mo</p>}
                  {checked === 'yr' && <p>+$20/yr</p>}
                </div>
              </div>
            </div>
          </section>}
          {formSteps >= 4 && 
          <section className={formSteps === 4?'':'hidden'}>
            <h1>Finishing up</h1>
            <p className='p-text'>Double-check everything looks Ok before confirming.</p>

            <div className='wrap'>
              <div className='wrap-top'>
                <div className='wrap-top-cont'>
                  {plan===1 && <h1>Arcade</h1>}
                  {plan===2 && <h1>Advanced</h1>}
                  {plan===3 && <h1>Pro</h1>}
                  <p onClick={()=>setFormSteps(2)} className='change-plan'><u>Change</u></p>
                </div>
                <div className='wrap-top-price'>
                  {checked === 'mo' && <p>+${(6+(plan*3))}/mo</p>}
                  {checked === 'yr' && <p>+${(6+(plan*3))}0/yr</p>}
                </div>
              </div>
              <div className='wrap-middle'>
                {watch().online && 
                <div className='wrap-middle-cont'>
                  <p>Online service</p> 
                  {checked === 'mo' && <p>+$1/mo</p>}
                  {checked === 'yr' && <p>+$10/yr</p>}
                </div>}
                {watch().largeStorage &&
                <div className='wrap-middle-cont'>
                  <p>Larger storage</p> 
                  {checked === 'mo' && <p>+$2/mo</p>}
                  {checked === 'yr' && <p>+$20/yr</p>}
                </div>}
                {watch().customProfile &&
                <div className='wrap-middle-cont'>
                  <p>Custom profile</p> 
                  {checked === 'mo' && <p>+$2/mo</p>}
                  {checked === 'yr' && <p>+$20/yr</p>}
                </div>}
              </div>
            </div>

            <div className='wrap-total'>
              <p>Total (per month)</p> 
                {checked === 'mo' && <p>+${(6+(plan*3))+(online?1:0)+(2*(largeStore?1:0))+(2*(custom?1:0))}/mo</p>}
               {checked === 'yr' && <p>+${(6+(plan*3))+(online?1:0)+(2*(largeStore?1:0))+(2*(custom?1:0))}0/yr</p>}
            </div>
          </section>}
          {formSteps >= 5 && 
            <section className={formSteps === 5?'':'hidden'}>
              <div className='thanks'>
                <i><img src={succes} alt="thanks" /></i>
                <h1 className='thanks-title'>Thank you!</h1>
                <p className='thanks-message'>Thanks for confirming you subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com</p>
              </div>
            </section>
          }
          {formSteps < 5 &&
          <div className='buttons'>
            <button type='button' className={formSteps >= 2?'backward':'backward opacity-0'} disabled={formSteps < 2} onClick={()=>backStep()}>Go Back</button>
            <div className='foward'>
              {formSteps < 4 &&<button className='next-btn' type='button' onClick={()=>{verifyForm()}}>Next Step</button>}
              {formSteps===4 && <button type='submit'>Confirm</button>}
            </div>
          </div>}
        </form>
      </main>
      {/* <pre>
        {JSON.stringify(watch(),null,2)}
      </pre> */}
    </div>
  )
}

export default Mainform
